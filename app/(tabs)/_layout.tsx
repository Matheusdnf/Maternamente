import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCores } from "../../lib/tema";
import { useDesktop } from "../../lib/desktop";

// Componente separado garante que hooks sejam usados corretamente (fora de callbacks)
function AnimatedTabIcon({ focused, children }: { focused: boolean; children: React.ReactNode }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.12 : 1,
      useNativeDriver: Platform.OS !== "web",
      speed: 20,
      bounciness: 8,
    }).start();
  }, [focused]);

  // Pílula baixa (28px) cabe no espaço do ícone e não invade o rótulo
  return (
    <View
      className={
        focused
          ? "bg-pessego w-14 h-7 rounded-full items-center justify-center"
          : "w-14 h-7 items-center justify-center"
      }
    >
      <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>
    </View>
  );
}

// Menu lateral da web: ícones + rótulos, ou só ícones quando recolhido. O botão fica no rodapé.
function MenuLateral({ state, descriptors, navigation, recolhido, alternar }: any) {
  const cores = useCores();
  const ativo = "#D97D54";
  return (
    <View
      style={{
        width: recolhido ? 80 : 248,
        backgroundColor: cores.cartao,
        borderRightWidth: 1,
        borderRightColor: cores.borda,
        paddingHorizontal: 12,
        paddingTop: 24,
        paddingBottom: 16,
      }}
    >
      <View style={{ height: 56, justifyContent: "center", alignItems: recolhido ? "center" : "flex-start", paddingHorizontal: recolhido ? 0 : 12 }}>
        <Text style={{ color: ativo, fontSize: recolhido ? 22 : 20, fontWeight: "800" }}>{recolhido ? "M" : "Maternamente"}</Text>
      </View>
      <View style={{ flex: 1, marginTop: 24 }}>
        {state.routes.map((route: any, i: number) => {
          const { options } = descriptors[route.key];
          const focado = state.index === i;
          const cor = focado ? ativo : cores.textoSuave;
          const abrir = () => {
            const ev = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
            if (!focado && !ev.defaultPrevented) navigation.navigate(route.name, route.params);
          };
          return (
            <TouchableOpacity
              key={route.key}
              onPress={abrir}
              accessibilityRole="button"
              accessibilityLabel={options.title}
              accessibilityState={{ selected: focado }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: recolhido ? "center" : "flex-start",
                height: 48,
                borderRadius: 16,
                marginBottom: 6,
                paddingHorizontal: recolhido ? 0 : 12,
                backgroundColor: focado ? cores.pessego : "transparent",
              }}
            >
              {options.tabBarIcon?.({ focused: focado, color: cor, size: 22 })}
              {!recolhido && <Text style={{ color: cor, fontSize: 15, fontWeight: "600", marginLeft: 4 }}>{options.title}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        onPress={alternar}
        accessibilityRole="button"
        accessibilityLabel={recolhido ? "Expandir menu" : "Recolher menu"}
        style={{ height: 48, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: recolhido ? "center" : "flex-start", paddingHorizontal: recolhido ? 0 : 12 }}
      >
        <Ionicons name={recolhido ? "chevron-forward-circle-outline" : "chevron-back-circle-outline"} size={26} color={ativo} />
        {!recolhido && <Text style={{ color: cores.textoSuave, fontSize: 14, fontWeight: "600", marginLeft: 12 }}>Recolher menu</Text>}
      </TouchableOpacity>
    </View>
  );
}

export default function TabsLayout() {
  const cores = useCores();
  const activeColor = "#D97D54";
  const inactiveColor = cores.textoSuave;
  const tabBgColor = cores.cartao;
  const { bottom } = useSafeAreaInsets();
  const desktop = useDesktop();
  const [recolhido, setRecolhido] = useState(true); // começa recolhido (só ícones)

  return (
    <Tabs
      // Desktop (web larga): menu lateral próprio, que pode ser recolhido; no celular, a barra padrão
      tabBar={desktop ? (props: any) => <MenuLateral {...props} recolhido={recolhido} alternar={() => setRecolhido((v) => !v)} /> : undefined}
      screenOptions={{
        headerShown: false,
        tabBarPosition: desktop ? "left" : "bottom", // define só a direção do layout (menu ao lado do conteúdo)
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: tabBgColor,
          borderTopWidth: 1,
          borderTopColor: cores.borda,
          height: 70 + bottom,
          paddingBottom: 8 + bottom,
          paddingTop: 8,
          elevation: 0,
          boxShadow: "none",
        },
        tabBarIconStyle: { width: 56, height: 28 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500", paddingBottom: 2 },
      }}
    >
      {/* 1. Aba: Início */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <MaterialCommunityIcons
                name={focused ? "view-dashboard" : "view-dashboard-outline"}
                size={22}
                color={color}
              />
            </AnimatedTabIcon>
          ),
        }}
      />
      {/* 2. Aba: Jornada */}
      <Tabs.Screen
        name="jornada"
        options={{
          title: "Jornada",
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Ionicons
                name={focused ? "map" : "map-outline"}
                size={22}
                color={color}
              />
            </AnimatedTabIcon>
          ),
        }}
      />
      {/* 3. Aba: Atividades */}
      <Tabs.Screen
        name="atividades"
        options={{
          title: "Atividades",
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Ionicons
                name={focused ? "game-controller" : "game-controller-outline"}
                size={22}
                color={color}
              />
            </AnimatedTabIcon>
          ),
        }}
      />
      {/* 4. Aba: Perfil */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon focused={focused}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={22}
                color={color}
              />
            </AnimatedTabIcon>
          ),
        }}
      />
    </Tabs>
  );
}
