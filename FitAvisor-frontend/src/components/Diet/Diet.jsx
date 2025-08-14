import { useForm, FormProvider } from "react-hook-form";
import { Outlet } from "react-router-dom";
import ProgressBar from "../progressBar";
import { useEffect } from "react";

export default function Diet(nextPath = String) {
  const saveFormData = JSON.parse(localStorage.getItem("saveFormData"));

  const dietStep = useForm({
    defaultValues: saveFormData || {
      gender: "",
      exerciseNumber: "",
      goToExercise: [],
      lastExercise: "",
      exerciseLevel: "",
      exercisePart: "",
      exerciseTime: "",
    },
  });

  const watchFormData = dietStep.watch();

  // watchFormData에 데이터가 저장이 되면 로컬스토리지에 dietStep을 저장하는 로직
  useEffect(() => {
    localStorage.setItem("saveFormData", JSON.stringify(watchFormData));
  }, [watchFormData]);

  return (
    <FormProvider {...dietStep}>
      <ProgressBar />
      <Outlet />
    </FormProvider>
  );
}
