import { createHomeStyles } from "@/assets/styles/home.styles";
import AddScanItemButton from "@/components/AddScanItemButton";
import Header from "@/components/Header";
import ScanHistoryItem from "@/components/ScanHistoryItem";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useRef, useState } from "react";
import { Alert, FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, PermissionsAndroid, Platform } from "react-native";
import DocumentScanner from 'react-native-document-scanner-plugin';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  
  const {colors} = useTheme()
  const homeStyles = createHomeStyles(colors)
  const [showButton, setShowButton] = useState(false);
  const SCROLL_THRESHOLD = 300
  const [scannedImageUri, setScannedImageUri] = useState<String | null>(null);

  // Ref to access FlatList methods
  const listRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > SCROLL_THRESHOLD) {
      setShowButton(true);
      } else {
      setShowButton(false);
    }
  }

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
    })
  }

const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'We need camera access to scan your receipts.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; 
  };

  const scanDocument = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot scan without camera permission')
      return;
    }

    try {
      const {scannedImages, status} = await DocumentScanner.scanDocument({croppedImageQuality: 90});

      if (status === 'success' && scannedImages && scannedImages.length > 0) {
        setScannedImageUri(scannedImages[0]);
        console.log('Scanned image URI: ', scannedImages[0]);
      }else if (status === 'cancel') {
        console.log('Scanning Cancelled by user.')
      }
    } catch(error){
      console.error('Error scanning document: ', error);
      Alert.alert('Error', 'An error occurred while scanning the document.')
    }
  }

  interface ScanHistoryData {
    id: string;
    itemName: string;
    points: number;
    date: string;
  }

  const MOCK_SCAN_HIST: ScanHistoryData[] = (() => {
    const arr: ScanHistoryData[] = [];
    for (let i = 1; i <= 100; i++) {
      arr.push({
        id: String(i),
        itemName: `Test${i}`,
        points: Math.floor(Math.random()*1000),
        date: 'Today',
      });
    }
    return arr;
  })();

  const renderItem: ListRenderItem<ScanHistoryData> = useCallback(({item}) => (
    <ScanHistoryItem
      itemName={item.itemName}
      points={item.points}
      date={item.date}
    />
  ), []);

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <SafeAreaView style={homeStyles.safeArea}>
        <Header/>
        <ScrollToTopButton
          visible={showButton}
          onPress={scrollToTop}
        />
        <FlatList
          ref={listRef}
          data={MOCK_SCAN_HIST}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      <AddScanItemButton 
        onPress={scanDocument}
      />
      </SafeAreaView>
    </LinearGradient>

  );
}
