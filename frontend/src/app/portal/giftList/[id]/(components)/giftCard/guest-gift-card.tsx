import useGiftPresent from '../../(hooks)/useGiftPresent';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Boxes, Gift, Link2 } from 'lucide-react';
import Link from 'next/link';

import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/Common/spinner/spinner';

const giftPresentSchema = z.object({
  quantity: z.number().nonnegative(),
});

export interface GuestGiftCardProps {
  id: number;
  productName: string;
  quantity: number;
  productLink: string;
}

type giftPresentType = z.infer<typeof giftPresentSchema>;

export default function GuestGiftCard({
  id,
  productLink,
  productName,
  quantity,
}: GuestGiftCardProps) {
  const [selectedGiftID, setSelectedGiftID] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<giftPresentType>({
    resolver: zodResolver(giftPresentSchema),
  });
  const giftPresent = useGiftPresent();
  const onSubmit: SubmitHandler<giftPresentType> = (formData) => {
    giftPresent(selectedGiftID, formData.quantity);
  };
  useEffect(() => {
    if (id === selectedGiftID) {
      reset();
    }
  }, [selectedGiftID, id, reset]);
  return (
    <>
      {id !== selectedGiftID && (
        <Card className="w-full max-w-sm border-amber-800 hover:shadow-md hover:shadow-amber-800 font-inter">
          <CardContent className="flex flex-col gap-6 font-semibold min-w-[350px] pt-6">
            <div className="flex flex-row gap-4 items-center">
              <Gift size={24} className="text-amber-800" />
              <span className="text-lg text-stone-700">{productName}</span>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Boxes size={24} className="text-amber-800" />
              <span className="text-lg text-stone-700">
                Quantity on list remaining: <span className="text-amber-800">{quantity}</span>
              </span>
            </div>
          </CardContent>
          <CardFooter className="items-start flex flex-col w-full gap-4">
            <Link
              href={productLink.startsWith('http') ? productLink : `https://${productLink}`}
              target="_blank"
            >
              <div className="flex flex-row gap-4 items-center">
                <Link2 size={24} className="text-amber-800" />
                <span className="text-stone-700 hover:underline hover:text-amber-800">
                  {`Open this product's page on store`}
                </span>
              </div>
            </Link>
            <Button
              type="button"
              className="bg-stone-700 w-full text-md"
              onClick={() => setSelectedGiftID(id)}
            >
              Gift Present
            </Button>
          </CardFooter>
        </Card>
      )}
      {id === selectedGiftID && (
        <Card className="w-full max-w-sm border-amber-800 hover:shadow-md hover:shadow-amber-800 font-inter">
          <CardContent className="flex flex-col gap-6 font-semibold min-w-[350px] pt-6">
            <div className="flex flex-row gap-4 items-center">
              <Gift size={24} className="text-amber-800" />
              <span className="text-lg text-stone-700 ">{productName}</span>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Boxes size={24} className="text-amber-800" />
              <span className="text-lg text-stone-700">
                Quantity on list remaining: <span className="text-amber-800">{quantity}</span>
              </span>
            </div>
          </CardContent>
          <CardFooter className="items-start flex flex-col w-full gap-4">
            <Link
              href={productLink.startsWith('http') ? productLink : `https://${productLink}`}
              target="_blank"
            >
              <div className="flex flex-row gap-4 items-center">
                <Link2 size={24} className="text-amber-800" />
                <span className="text-stone-700 hover:underline hover:text-amber-800">
                  {`Open this product's page on store`}
                </span>
              </div>
            </Link>
            <div className="flex flex-col items-center w-full justify-center">
              <form
                className="w-full"
                onSubmit={handleSubmit(onSubmit, (errors) => {
                  console.log('Error on submitting:', errors);
                })}
              >
                <div className="flex flex-col gap-3 mt-3 mb-3 w-full items-start">
                  <Label className="text-md text-stone-700">
                    Type the quantity you want to gift:
                  </Label>
                  <Input
                    type="number"
                    max={quantity}
                    {...register('quantity', { valueAsNumber: true })}
                    className="text-amber-800 font-semibold bg-white"
                  />
                </div>
                <div className="flex flex-row gap-5 w-full">
                  <Button
                    type="submit"
                    className="w-full bg-stone-500 text-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Spinner /> : 'Confirm'}
                  </Button>
                  <Button
                    variant="destructive"
                    type="button"
                    className="w-full text-stone-100 text-md"
                    onClick={() => {
                      setSelectedGiftID(0);
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
