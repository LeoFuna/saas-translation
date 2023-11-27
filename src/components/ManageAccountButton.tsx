export default function ManageAccountButton({
  onSubmit
}: { onSubmit: () => Promise<void> }) {
  return <form action={onSubmit}>
    <button
      type="submit"
    >
      Manage Billing
    </button>
  </form>
}