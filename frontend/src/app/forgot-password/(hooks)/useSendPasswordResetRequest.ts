import { z } from 'zod';
import { emailSchema } from '../page';
import axios from 'axios';
import AxiosErrorHandler from '@/app/(auxiliary-functions)/axios-error-handler';
import { useGeneralStore } from '@/stores/general/general.provider';
import { useShallow } from 'zustand/shallow';

export default function useSendPasswordResetRequest() {
  type userEmail = z.infer<typeof emailSchema>;
  const { setStatusMessage, setIsLoading } = useGeneralStore(
    useShallow((store) => ({
      setStatusMessage: store.setStatusMessage,
      setIsLoading: store.setIsLoading,
    })),
  );
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  async function sendPasswordResetRequest(data: userEmail) {
    if (data) {
      try {
        setIsLoading(true);
        const response = await axios.post(`${apiURL}/auth/forgot-password`, data);
        if (response.status === 200) {
          setStatusMessage(
            `If an account with that email exists, a password reset link has been sent. Please check your inbox.`,
          );
        }
      } catch (error) {
        AxiosErrorHandler({ error });
      } finally {
        setIsLoading(false);
      }
    }
  }
  return sendPasswordResetRequest;
}
