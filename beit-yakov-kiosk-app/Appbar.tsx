import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface Props {
  onBack: () => void;
}

const AppBarContainer = styled.View`
  flex-direction: row-reverse;
  justify-content: end;
  align-items: start;
  padding: 12px;
  margin-top: 24px;
  background-color: green;
`;

const StyledText = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: bold;
`;

export const AppBar = ({ onBack }: Props) => (
  <AppBarContainer>
    <TouchableOpacity onPress={onBack}>
      <StyledText>חזרה</StyledText>
    </TouchableOpacity>
  </AppBarContainer>
);
