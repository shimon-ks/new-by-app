import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import styled from "styled-components/native";
import { AppBar } from "./Appbar";
import { useWebView } from "./useWebView";
import { LeaveAppScreen } from "./pages/leave-app/leave-app-screen";

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const WebViewContainer = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
`;

const FloatingButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background-color: green;
  border-radius: 30px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

const FloatingButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;
export default function App() {
  const {
    initialUrl,
    allowedUrls,
    webViewRef,
    showAppBar,
    showPasswordScreen,
    navigateBack,
    handleBlockSpecificUrl,
    handleFloatingButtonClick,
  } = useWebView();

  return (
    <Container>
      <StatusBar style="auto" />
      {showPasswordScreen ? (
        <LeaveAppScreen onBack={handleFloatingButtonClick} />
      ) : (
        <WebViewContainer>
          {showAppBar ? <AppBar onBack={navigateBack} /> : <View />}
          <WebView
            ref={webViewRef}
            source={{ uri: initialUrl }}
            onShouldStartLoadWithRequest={(request) =>
              handleBlockSpecificUrl(allowedUrls, request)
            }
          />
          <FloatingButton onPress={handleFloatingButtonClick}>
            <FloatingButtonText>יציאה</FloatingButtonText>
          </FloatingButton>
        </WebViewContainer>
      )}
    </Container>
  );
}
