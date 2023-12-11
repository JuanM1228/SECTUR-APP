import React from 'react';
import { IconButton } from '@mui/material';
import Icons from '@/assets/icons';
import Button from '@/components/common/Button'
import { STEP_ENUM } from '@/utils/constants';

function Completed({step}) {
  return (
    <div className={`font-GMX h-screen flex flex-col justify-center items-start sm:items-center ${step === STEP_ENUM.COMPLETADO ? '' : 'hide'}`}>
      <IconButton><Icons.TaskAlt className="w-24 h-24 text-seaGreen animate-bounce"/></IconButton>
      <strong className="text-4xl font-semibold mb-2">Su tramite ha sido finalizado</strong>
      <p className="text-2xl text-gray-600 mb-4">Lo mantendremos informado acerca del estado.</p>
      <Button content="Regresar a inicio" className="text-2xl mt-10" fullWidth={false} />
    </div>
  );
}

export default Completed;
