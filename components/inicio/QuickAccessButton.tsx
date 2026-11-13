import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { QuickAccessButtonProps } from "../../types/components";
import { useDesktop } from "../../lib/desktop";
import { useCores } from "../../lib/tema";

export const QuickAccessButton = React.memo(function QuickAccessButton({
  title,
  subtitle,
  icon,
  bgColor,
}: QuickAccessButtonProps) {
  const router = useRouter();
  const cores = useCores();
  const desktop = useDesktop();

  const abrir = () => {
    if (title === "Meu Diário") {
      router.push("/diario" as any);
    } else if (title === "Consultas") {
      router.push("/consultas" as any);
    } else if (title === "Respiração") {
      router.push("/respiracao" as any);
    }
  };

  // Desktop: mesmo cartão das opções do Perfil (ícone, textos, seta), três numa linha
  if (desktop) {
    return (
      <TouchableOpacity
        className="flex-1 flex-row items-center p-4 bg-cartao border border-borda rounded-2xl"
        activeOpacity={0.7}
        onPress={abrir}
      >
        <View className={`${bgColor} w-10 h-10 rounded-2xl items-center justify-center mr-3`}>{icon}</View>
        <View className="flex-1">
          <Text className="text-[15px] font-bold text-texto">{title}</Text>
          <Text className="text-xs text-texto-suave mt-0.5">{subtitle}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={cores.bordaForte} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className={`${bgColor} flex-1 min-w-[47%] rounded-3xl p-5 mb-3 mx-1 border border-borda/30`}
      activeOpacity={0.8}
      onPress={abrir}
    >
      <View className="mb-3">{icon}</View>
      <Text className="text-base font-bold text-texto">{title}</Text>
      <Text className="text-xs text-texto-2 mt-1">{subtitle}</Text>
    </TouchableOpacity>
  );
});
