import { useState } from "react";
import { BackHandler, Linking, Platform } from "react-native";
import {
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

export const usePinCode = () => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleCodeChange = (code: string) => {
    setValue(code);

    if (code.length === CELL_COUNT) {
      if (code === "725933") {
        if (Platform.OS === "android") {
          BackHandler.removeEventListener("hardwareBackPress", () => false);
          Linking.removeAllListeners("url");
        }
        setValue("");
        BackHandler.exitApp();
      }
    }
  };

  return {
    ref,
    props,
    value,
    CELL_COUNT,
    handleCodeChange,
    getCellOnLayoutHandler,
  };
};
