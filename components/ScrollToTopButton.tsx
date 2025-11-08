import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface ScrollToTopButtonProps {
    visible: boolean;
    onPress: () => void;
}

const ScrollToTopButton = ({visible, onPress}: ScrollToTopButtonProps) => {
  
    const {colors} = useTheme()
    const homeStyles = createHomeStyles(colors)
  
    if (!visible) return null;

    return (
        <TouchableOpacity
            style={homeStyles.scrollToTopButton}
            onPress={onPress}
            activeOpacity={0.7}
            >
            <Ionicons name="arrow-up" size={24} color="white" />
        </TouchableOpacity>
    )
}

export default ScrollToTopButton