import { CodeField, Cursor } from "react-native-confirmation-code-field";
import styled from "styled-components/native";
import { usePinCode } from "./useCodePin";
import { AppBar } from "../../Appbar";

const RootContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
`;

const TitleText = styled.Text`
  text-align: center;
  font-size: 18px;
  margin-top: 42px;
`;

const SubtitleText = styled.Text`
  text-align: center;
  font-size: 16px;
`;

const CodeFieldContainer = styled.View`
  flex: 1;
  justify-content: center;
  margin: 0px 42px;
`;

const CellText = styled.Text<{ isFocused: boolean }>`
  width: 40px;
  height: 40px;
  line-height: 38px;
  font-size: 24px;
  border-width: 2px;
  border-color: ${(props) => (props.isFocused ? "green" : "grey")};
  text-align: center;
  margin: 0 5px;
  border-radius: 20px;
`;

interface Props {
  onBack: () => void;
}

export const LeaveAppScreen = ({ onBack }: Props) => {
  const {
    ref,
    props,
    value,
    CELL_COUNT,
    handleCodeChange,
    getCellOnLayoutHandler,
  } = usePinCode();

  return (
    <RootContainer>
      <AppBar onBack={onBack} />
      <TitleText>יציאה מהאפליקציה</TitleText>
      <SubtitleText>בשביל לצאת מהאפליקציה אנא הקש את הקוד</SubtitleText>
      <CodeFieldContainer>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          blurOnSubmit={false}
          autoFocus={true}
          onChangeText={handleCodeChange}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <CellText
              isFocused={isFocused}
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </CellText>
          )}
        />
      </CodeFieldContainer>
    </RootContainer>
  );
};
