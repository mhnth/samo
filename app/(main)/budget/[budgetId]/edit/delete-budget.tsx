'use client';

import { deactivateBudget } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  message: '',
  isOk: false,
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  );
}

export function DeactivateForm({ id }: { id: string }) {
  const [state, formAction] = useFormState(deactivateBudget, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
