import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RoomType } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllBookings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      checkIn: string;
      checkOut: string;
      roomType: RoomType;
      guests: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitBooking(
        data.name,
        data.email,
        data.checkIn,
        data.checkOut,
        data.roomType,
        data.guests,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
