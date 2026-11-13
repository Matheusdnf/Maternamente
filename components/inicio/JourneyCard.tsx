import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { PregnancyStatus } from "../../types/pregnancy";
import { useDesktop } from "../../lib/desktop";

export const JourneyCard = React.memo(function JourneyCard({
  currentWeek,
  totalWeeks,
  trimester,
  progressPercentage,
  offlineSaved,
}: PregnancyStatus) {
  const desktop = useDesktop();
  return (
    // Removido o boxShadow manual em JS. Adicionado 'border border-white/20' para relevo limpo e uniforme
    // Desktop: ocupa a altura da coluna (igual ao cartão vizinho), com o rodapé no fim
    <View className={`bg-[#D97D54] rounded-[24px] p-5 border border-white/20 w-full ${desktop ? "flex-1" : "my-3"}`}>
      <View className="flex-row items-center mb-2">
        <MaterialCommunityIcons
          name="baby-face-outline"
          size={16}
          color="#FFF"
        />
        <Text className="text-white text-sm font-medium ml-1.5">
          {trimester}
        </Text>
      </View>
      <Text className="text-white text-3xl font-bold">
        Semana {currentWeek}
      </Text>
      <Text className="text-[#FFE6DC] text-base mb-5">
        de {totalWeeks} semanas da jornada
      </Text>
      <View className="flex-row justify-between mb-1.5">
        <Text className="text-white text-xs opacity-90">
          Progresso da jornada
        </Text>
        <Text className="text-white text-xs font-bold">
          {progressPercentage}%
        </Text>
      </View>
      <View className="h-2 w-full bg-white/30 rounded-full mb-4 overflow-hidden">
        <View
          className="h-full bg-cartao rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </View>
      <View className={`flex-row items-center border-t border-white/20 pt-3 ${desktop ? "mt-auto" : "mt-1"}`}>
        <Ionicons name="cloud-offline-outline" size={14} color="#FFE6DC" />
        <Text className="text-[#FFE6DC] text-xs ml-1.5">{offlineSaved}</Text>
        <Ionicons
          name="checkmark-circle"
          size={14}
          color="#FFF"
          className="ml-auto"
        />
      </View>
    </View>
  );
});
