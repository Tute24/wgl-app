'use client';

import newListSchema from '@/zodSchemas/newListSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CircleX } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import useSubmitList from '../../(hooks)/useSubmitList';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/Common/spinner/spinner';
import { useGeneralStore } from '@/stores/general/general.provider';
import { useShallow } from 'zustand/shallow';

export type listData = z.infer<typeof newListSchema>;

export default function GiftListForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<listData>({
    resolver: zodResolver(newListSchema),
  });
  const { fields, append, remove } = useFieldArray<listData>({
    control,
    name: 'gifts',
  });
  const submitForm = useSubmitList();
  const onSubmit: SubmitHandler<listData> = (data) => {
    submitForm(data);
    reset();
    remove();
  };
  const { statusMessage } = useGeneralStore(
    useShallow((store) => ({
      statusMessage: store.statusMessage,
    })),
  );
  return (
    <div className="flex flex-col items-center justify-center m-auto pt-20 px-4 font-inter pb-10">
      <Card className="border-amber-800 hover:shadow-md hover:shadow-amber-800">
        <CardHeader>
          <CardTitle className="text-center text-xl text-amber-800 font-bold">
            Create a wedding gift list
          </CardTitle>
          <CardDescription>{`Enter the wedding's infos and set up it's gifts list`}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start justify-start gap-5">
              <div className="flex flex-col gap-3 w-full">
                <Label className="text-md text-stone-700">Wedding name</Label>
                <Input
                  className="!text-md !text-amber-800 !placeholder-amber-800"
                  type="text"
                  {...register('listTitle')}
                  placeholder={`Enter the wedding's name`}
                  required
                />
                {errors.listTitle && (
                  <span className="font-inter text-red-600 text-sm">
                    {errors.listTitle.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Label className="text-md text-stone-700">Wedding date</Label>
                <Input
                  data-testid="wedding-date-input"
                  className="!text-md !text-amber-800 !placeholder-amber-800"
                  type="date"
                  {...register('weddingDate')}
                  required
                />
                {errors.weddingDate && (
                  <span className="font-inter text-red-600 text-sm">
                    {errors.weddingDate.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Label className="text-md text-stone-700">Shipping address</Label>
                <Input
                  className="!text-md !text-amber-800 !placeholder-amber-800"
                  type="text"
                  {...register('shippingAddress')}
                  placeholder="The gift's delivery address"
                  required
                />
                {errors.shippingAddress && (
                  <span className="font-inter text-red-600 text-sm">
                    {errors.shippingAddress.message}
                  </span>
                )}
              </div>
              {fields.map((item, index) => (
                <div key={index} className="flex flex-col items-start justify-start gap-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex justify-between items-center">
                      <Label className="text-md text-stone-700">Product name</Label>
                      <button type="button" onClick={() => remove(index)}>
                        <CircleX size={18} />
                      </button>
                    </div>
                    <Input
                      className="!text-md !text-amber-800 !placeholder-amber-800"
                      type="text"
                      {...register(`gifts.${index}.productName`)}
                      placeholder="Enter the product's name"
                    />
                    {errors.gifts?.[index]?.productName && (
                      <span className="font-inter text-red-600 text-sm">
                        {errors.gifts[index].productName?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <Label className="text-md text-stone-700">Product link</Label>
                    <Input
                      className="!text-md !text-amber-800 !placeholder-amber-800"
                      type="text"
                      {...register(`gifts.${index}.productLink`)}
                      placeholder="Link to buy the gift"
                    />
                    {errors.gifts?.[index]?.productLink && (
                      <span className="font-inter text-red-600 text-sm">
                        {errors.gifts[index].productLink?.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <Label className="text-md text-stone-700">Quantity</Label>
                    <Input
                      className="!text-md !text-amber-800 !placeholder-amber-800"
                      type="number"
                      min={1}
                      {...register(`gifts.${index}.quantity`)}
                    />
                    {errors.gifts?.[index]?.quantity && (
                      <span className="font-inter text-red-600 text-sm">
                        {errors.gifts[index].quantity?.message}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                className="w-full text-md font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  append({ productLink: '', productName: '', quantity: '' });
                }}
              >
                Add gift
              </Button>
              <Button
                type="submit"
                className="w-full text-md font-bold bg-paleGold hover:bg-mutedTaupe text-amber-800 hover:text-champagneGold"
              >
                {isSubmitting ? <Spinner /> : 'Create List'}
              </Button>
            </div>
          </form>
        </CardContent>
        {statusMessage ? (
          <CardFooter
            className={`font-inter font-medium ${statusMessage === 'Wedding created successfully!' ? 'text-green-600' : 'text-red-600'} text-md flex justify-center`}
          >
            {statusMessage}
          </CardFooter>
        ) : (
          ''
        )}
      </Card>
    </div>
  );
}
