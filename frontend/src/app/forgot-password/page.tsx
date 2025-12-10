'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import useSendPasswordResetRequest from './(hooks)/useSendPasswordResetRequest';
import UnLoggedHeader from '@/app/(components)/headers/unlogged-header';
import { Spinner } from '../(components)/Common/spinner/spinner';
import { useGeneralStore } from '@/stores/general/general.provider';
import { useShallow } from 'zustand/shallow';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../(components)/ui/card';
import { Label } from '../(components)/ui/label';
import { Input } from '../(components)/ui/input';
import { Button } from '../(components)/ui/button';

export const emailSchema = z.object({
  email: z.string().email({ message: 'Enter a valid e-mail address' }),
});

type userEmail = z.infer<typeof emailSchema>;

export default function SendMail() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userEmail>({
    resolver: zodResolver(emailSchema),
  });
  const { statusMessage, isLoading } = useGeneralStore(
    useShallow((store) => ({
      statusMessage: store.statusMessage,
      isLoading: store.isLoading,
    })),
  );
  const sendPasswordResetRequest = useSendPasswordResetRequest();
  const onSubmit: SubmitHandler<userEmail> = (data) => {
    sendPasswordResetRequest(data);
  };
  return (
    <>
      <UnLoggedHeader />
      <div className="flex flex-col items-center justify-center m-auto pt-20">
        <Card className="max-w-[400px] border-amber-800 hover:shadow-md hover:shadow-amber-800">
          <CardHeader>
            <CardTitle className="!text-amber-800 text-bold text-xl font-inter text-center">
              Forgot Your Password?{' '}
            </CardTitle>
            <CardDescription className="text-sm font-inter">
              Enter your e-mail and we will send you the password resert instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-start gap-3 font-inter w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <Label className="text-md text-stone-700">Enter your e-mail</Label>
                  <Input
                    className="!text-md !text-amber-800 !placeholder-amber-800"
                    type="text"
                    {...register('email')}
                    placeholder="Your e-mail here"
                  />
                  {errors.email && (
                    <p className="font-inter text-red-600 text-sm">{errors.email.message}</p>
                  )}
                </div>
                <div className="w-full items-center pt-3 flex flex-col">
                  <Button
                    className="w-full bg-paleGold hover:bg-mutedTaupe text-amber-800 hover:text-champagneGold font-bold text-lg font-inter"
                    type="submit"
                  >
                    {isSubmitting || isLoading ? <Spinner /> : 'Confirm'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 items-center text-sm text-muted-foreground font-inter">
            {statusMessage}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
