"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

interface PropType {
  defaultText: string;
}

const ActionFormBtn = (props: PropType) => {
  const { defaultText } = props;

  const { pending } = useFormStatus();

  return (
    <Button variant="purple" disabled={pending ? true : false}>
      {pending ? "Loading..." : defaultText}
    </Button>
  );
};

export default ActionFormBtn;
