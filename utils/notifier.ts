import toast from "react-hot-toast";

export const notify = (type: 'success' | 'error', msg: string) => type === 'error' ? toast.error(msg) : toast.success(msg);
