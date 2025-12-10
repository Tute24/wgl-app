'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import useSubmitPasswordReset from './(hooks)/useSubmitPasswordReset';
import { Spinner } from '@/components/Common/spinner/spinner';
import UnLoggedHeader from '@/components/Headers/unlogged-header';
import { useGeneralStore } from '@/stores/general/general.provider';
import { useShallow } from 'zustand/shallow';
import { passwordSchema } from '@/zodSchemas/usersDataSchema';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const newPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must be equal!',
    path: ['confirmPassword'],
  });

export type newPassword = z.infer<typeof newPasswordSchema>;

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<newPassword>({
    resolver: zodResolver(newPasswordSchema),
  });
  const { statusMessage, isLoading } = useGeneralStore(
    useShallow((store) => ({
      statusMessage: store.statusMessage,
      isLoading: store.isLoading,
    })),
  );
  const submitPasswordReset = useSubmitPasswordReset();
  const onSubmit: SubmitHandler<newPassword> = (data) => {
    submitPasswordReset(data);
  };
  return (
    <>
      <UnLoggedHeader />
      <div className="flex flex-col items-center justify-center m-auto pt-20">
        <Card className="w-[400px] border-amber-800 hover:shadow-md hover:shadow-amber-800">
          <CardHeader>
            <CardTitle className="!text-amber-800 text-bold text-xl font-inter text-center">
              Password Reset
            </CardTitle>
            <CardDescription className="text-sm font-inter">
              Create your new password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-start gap-3 font-inter w-full">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <Label className="text-md text-stone-700">New Password</Label>
                  <Input
                    className="!text-md !text-amber-800 !placeholder-amber-800"
                    type="password"
                    {...register('password')}
                    placeholder="Your new password here"
                  />
                  {errors.password && (
                    <p className="font-inter text-red-600 text-sm">{errors.password.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <Label className="text-md text-stone-700">Confirm your new password</Label>
                  <Input
                    className="!text-md !text-amber-800 !placeholder-amber-800"
                    type="password"
                    {...register('confirmPassword')}
                    placeholder="Confirm your password here"
                  />
                  {errors.confirmPassword && (
                    <p className="font-inter text-red-600 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="w-full items-center pt-3 flex flex-col">
                  <Button
                    className="w-full bg-paleGold hover:bg-mutedTaupe text-amber-800 hover:text-champagneGold font-bold text-lg font-inter"
                    type="submit"
                  >
                    {isSubmitting || isLoading ? <Spinner /> : 'Reset Password'}
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
