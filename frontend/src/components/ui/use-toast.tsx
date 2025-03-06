import { toast as hotToast } from 'react-hot-toast';

type ToastProps = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

export const useToast = () => {
  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    const toastFn = variant === 'destructive' ? hotToast.error : hotToast;
    
    if (title && description) {
      return toastFn(
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p>{description}</p>
        </div>
      );
    }
    
    return toastFn(title || description || '');
  };

  return { toast };
}; 