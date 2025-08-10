import { useForm, FormProvider } from "react-hook-form";
import { Outlet } from "react-router-dom";
import ProgressBar from "../progressBar";


export default function Diet(nextPath = String) {
  const dietStep = useForm({
    defaultValues: {
      bodyFat: "",
      exerciseNumber: "",
      goToExercise: [],
      lastExercise: "",
      exerciseLevel: "",
      exercisePart: "",
      exerciseTime: "",
    },
  });

  return (
    <FormProvider {...dietStep}>
      <ProgressBar /> 
      <Outlet />
    
      
    </FormProvider>
  );
}
