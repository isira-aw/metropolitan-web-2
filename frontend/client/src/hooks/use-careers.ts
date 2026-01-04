import { useMutation } from "@tanstack/react-query";
import { api, type InsertJobApplication } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useApplyJob() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertJobApplication) => {
      const res = await fetch(api.careers.apply.path, {
        method: api.careers.apply.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.careers.apply.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit application");
      }
      return api.careers.apply.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Application Received",
        description: "Thank you for applying. Our HR team will review your application.",
      });
    },
    onError: (error) => {
      toast({
        title: "Application Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
