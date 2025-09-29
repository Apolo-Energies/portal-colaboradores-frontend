import { Button } from '@/components/buttons/button';
import { Dialog } from '@/components/Dialogs/Dialog';
import { Progress } from '@/components/ui/Progress';
import React from 'react'
import { FormCommission } from '../Forms/FormCommission';
import { Commission } from '../../interfaces/commission';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { registerCommission } from '@/app/services/ComisionService/comision.service';
import { useAlertStore } from '@/app/store/ui/alert.store';
import { useReloadStore } from '@/app/store/reloadData/reloadFlag.store';

interface Props {
    open: boolean;
    onClose: () => void;
  }

export const ModalAddCommission = ({onClose, open}: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        watch,
      } = useForm<Commission>({
      });
      const { data: session } = useSession();
      const { showAlert } = useAlertStore();
      const {triggerReload} = useReloadStore();
    
      const watchedValues = watch();
    
      const calculateProgress = () => {
        const values = watchedValues;
        const filled = Object.values(values).filter(
          (v) => typeof v === "string" && v.trim() !== ""
        );
        const total = Object.keys(values).length;
        return Math.round((filled.length / total) * 100);
      };
    
    
      const onSubmitFinal = async (data: Commission) => {
      
        try {
          const token = session?.user.token;
          if (!token) {
            throw new Error("No se encontró el token de autenticación.");
          }
          const response = await registerCommission(token, data);
    
          if (response.status === 200 || response.status === 201) {
            showAlert("Comisión agregada correctamente: ", 'success')
            reset();
            onClose();
            triggerReload();
        } else {
            showAlert("Error al agregar Comisión: ", 'error')
          }
        } catch (error) {
          showAlert("Error inesperado agregar Comisión: ", 'error')
          console.error("Error inesperado al agregar Comisión:", error);
        }
      };
      
      const onCloseModal = () => {
        reset();
        onClose();
      };
      
      return (
        <Dialog open={open} onClose={onClose}>
          <div className="space-y-2 px-4 pt-4">
            <div className="flex justify-between text-sm">
              <span>Progreso</span>
              <span>{calculateProgress()}%</span>
            </div>
            <Progress value={calculateProgress()} />
          </div>
    
          <form
            onSubmit={handleSubmit(onSubmitFinal)}
            className="space-y-4 max-h-96 overflow-y-auto px-4 py-4"
          >
          <FormCommission register={register} errors={errors} />
            
          </form>
    
          <div className="sticky bottom-0 px-4 ">
            <div className="border-t border-border py-3 flex items-center justify-between">
              <Button variant="outline" onClick={onCloseModal}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit(onSubmitFinal)} disabled={!isValid}>
                Crear Comisión
              </Button>
            </div>
          </div>
        </Dialog>
      )
    }
    