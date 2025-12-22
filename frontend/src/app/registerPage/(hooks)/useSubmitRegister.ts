import { axiosInstance } from '@/common/axios-api/axios-api';
import { authStoreInstance } from '@/stores/auth/auth.provider';
import { useGeneralStore } from '@/stores/general/general.provider';
import usersDataSchema from '@/zodSchemas/usersDataSchema';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useShallow } from 'zustand/shallow';

export default function useSubmitRegister() {
  type usersData = z.infer<typeof usersDataSchema>;
  const { setStatusMessage } = useGeneralStore(
    useShallow((store) => ({
      setStatusMessage: store.setStatusMessage,
    })),
  );
  const setToken = authStoreInstance.getState().setToken;
  const router = useRouter();

  async function submitRegister(data: usersData) {
    if (data.password !== data.confirmPassword) {
      setStatusMessage('Passwords must be the same!');
    } else {
      try {
        const response = await axiosInstance.post('/users/user-create', data);

        if (response.status === 200) {
          const userToken = response.data.token as string;
          setToken(userToken);
          router.push('/portal/dashboard');
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            setStatusMessage('There is already an existent user with this e-mail!');
          }
          if (error.response?.status === 500) {
            setStatusMessage('Something went wrong within the server. Try again soon.');
          }
          console.log(error);
        }
        console.log(error);
      }
    }
  }

  return submitRegister;
}
