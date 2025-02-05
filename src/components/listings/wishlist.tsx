import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CircleAlert, Heart, X } from "lucide-react";
import styles from "./wishlist.module.scss";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 1 characters.",
  }),
});

export default function Wishlist() {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const categoryParams = params.get("category");

  const defaultName = useMemo(() => {
    const category = categoryParams || "tropical";
    return (
      category.replace(/-/g, " ").replace(/^\w/, (char) => char.toUpperCase()) +
      ` ${new Date().getFullYear()}`
    );
  }, [categoryParams]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: defaultName },
  });

  const watchedName = form.watch("name");
  const nameLength = watchedName.length;
  const isOverLimit = nameLength > 50;

  useEffect(() => {
    form.reset({ name: defaultName });
  }, [defaultName, form]);

  const onSubmit = useCallback((data: z.infer<typeof FormSchema>) => {
    console.log(data);
  }, []);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild className="absolute right-4 top-2">
        <Button
          variant="ghost"
          size="icon"
          className="z-10 group hover:bg-transparent border-none -mr-1.5 [&_svg]:size-7">
          <Heart className="group-hover:scale-105 fill-foreground/30 text-background drop-shadow-sm" />
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.content}>
        <DialogHeader className="p-6 border-b space-y-0 relative">
          <Button
            onClick={() => setOpen(false)}
            size="icon"
            variant="ghost"
            className="absolute left-4 top-1/2 -translate-y-1/2 [&_svg]:size-5">
            <X />
          </Button>
          <DialogTitle className="text-center font-semibold text-base">Create wishlist</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-7">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        className={`h-11 focus-visible:ring-1 ${
                          isOverLimit ? "focus-visible:ring-red-600 border-red-600" : ""
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <div className="flex items-center justify-between mt-1">
                      <div
                        className={`mt-1.5 text-xs text-foreground/70 font-medium ${
                          isOverLimit ? "text-red-600" : ""
                        }`}>
                        {nameLength}/50 characters
                      </div>
                      {isOverLimit && (
                        <div className="flex items-center gap-x-1.5 text-xs font-light text-red-600">
                          <CircleAlert size={13} />
                          Over character limit
                        </div>
                      )}
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="p-4 px-6 border-t">
              <div className="flex items-center justify-between w-full">
                <Button
                  type="button"
                  onClick={() => form.reset({ name: "" })}
                  variant="ghost"
                  className="rounded-lg font-medium text-base -ml-2 px-3 h-12">
                  Clear
                </Button>
                <Button
                  type="submit"
                  disabled={isOverLimit || nameLength === 0 ? true : false}
                  className="bg-foreground text-base font-medium rounded-lg px-7 h-12">
                  Create
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
