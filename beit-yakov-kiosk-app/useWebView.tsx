import React, { useEffect, useRef, useState } from "react";
import { Alert, BackHandler, Platform } from "react-native";
import WebView from "react-native-webview";

export const useWebView = () => {
  const initialUrl = "https://by-app.kristech.co.il/";

  const [allowedUrls, setAllowedUrls] = useState<string[]>([]);
  const [showAppBar, setShowAppBar] = useState(false);
  const [showPasswordScreen, setShowPasswordScreen] = useState(false);

  const webViewRef = useRef<WebView>(null);
  const canGoBack = useRef(false);

  useEffect(() => {
    initBackAction();
    fetchAllowedUrls();
  }, []);

  const initBackAction = () => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
    }
  };

  const onAndroidBackPress = () => {
    if (canGoBack.current && !!webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }

    return true;
  };

  const fetchAllowedUrls = async () => {
    try {
      const response = await fetch(
        `${initialUrl}wp-json/custom/v1/allowed-urls`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch allowed URLs.");
      }
      const data = await response.json();
      setAllowedUrls(data);
    } catch (error) {
      console.error("Error fetching allowed URLs:", error);
    }
  };

  const showBlockedLinkAlert = () => {
    Alert.alert(
      "קישור חסום",
      `לא ניתן לגשת לאינטרנט`,
      [
        {
          text: "המשך",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  const handleBlockSpecificUrl = (allowedUrls: string[], request: any) => {
    const url = request.url;

    if (url.startsWith(initialUrl)) {
      return true;
    }

    const isAllowed = allowedUrls.some((allowedUrl) => {
      const formattedAllowedUrl = allowedUrl;
      return url.startsWith(formattedAllowedUrl);
    });

    if (!isAllowed) {
      showBlockedLinkAlert();
      return false;
    }

    console.log(url);
    if (url !== initialUrl) {
      setShowAppBar(true);
    }
    return true;
  };

  const navigateBack = () => {
    if (webViewRef.current !== null) {
      webViewRef.current.goBack();
      setShowAppBar(false);
    }
  };

  const onShowPasswordScreen = (value: boolean) => {
    setShowPasswordScreen(value);
  };

  const handleFloatingButtonClick = () => {
    onShowPasswordScreen(!showPasswordScreen);
  };

  return {
    initialUrl,
    allowedUrls,
    webViewRef,
    showAppBar,
    showPasswordScreen,
    navigateBack,
    handleBlockSpecificUrl,
    onShowPasswordScreen,
    handleFloatingButtonClick,
  };
};
