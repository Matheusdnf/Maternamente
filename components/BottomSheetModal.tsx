import { useEffect, useState } from "react";
import { Pressable, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, BackHandler, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModalProps } from "../types/components";
import { FullScreenModal } from "./FullScreenModal";
import { useCores } from "../lib/tema";
import { useDesktop } from "../lib/desktop";

export function BottomSheetModal({ visible, onClose, title, children, animationType = "fade", semModal = false }: BottomSheetModalProps) {
  const cores = useCores();
  const desktop = useDesktop(); // diálogo centralizado em vez de sheet colado embaixo
  // Android + semModal: camada dentro da tela (sem janela de Modal); o próprio Android sobe a tela
  // com o teclado (softwareKeyboardLayoutMode "pan"), sem nenhum cálculo em JS que possa piscar.
  const naTela = semModal && Platform.OS === "android";

  // Android dentro de Modal: sem ajuste de teclado. KeyboardAvoidingView "height" entra em loop e pisca,
  // e ouvir o teclado deixa padding preso quando o Android não avisa que ele fechou.
  // Sheets com campos de texto usam semModal.

  // Na tela: o sheet fica logo acima do teclado (e rola por dentro), só enquanto está aberto.
  // Fora do Modal os eventos do teclado chegam certos; ao fechar, zera para não deixar espaço preso.
  const [teclado, setTeclado] = useState(0);
  useEffect(() => {
    if (!naTela || !visible) return setTeclado(0);
    const abre = Keyboard.addListener("keyboardDidShow", (e) => setTeclado(e.endCoordinates.height));
    const fecha = Keyboard.addListener("keyboardDidHide", () => setTeclado(0));
    return () => { abre.remove(); fecha.remove(); };
  }, [naTela, visible]);

  // Sem Modal não há onRequestClose: o botão voltar fecha o sheet em vez de sair da tela
  useEffect(() => {
    if (!naTela || !visible) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => { onClose(); return true; });
    return () => sub.remove();
  }, [naTela, visible, onClose]);

  const sheet = (
    <View style={{ flex: 1, justifyContent: desktop ? "center" : "flex-end", alignItems: "center", paddingBottom: teclado }}>
      {/* Fundo como irmão atrás do sheet (não pai): arrastar/tocar dentro do sheet nunca chega nele */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Fechar" />
      <View
        style={{
          backgroundColor: cores.cartao,
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          maxHeight: "85%",
          width: "100%",
          maxWidth: 576,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: desktop ? 24 : 48,
          borderTopWidth: 1,
          ...(desktop && { borderRadius: 32, borderWidth: 1 }),
          borderColor: cores.borda,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: "800", color: cores.texto }}>
            {title}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: cores.creme + "99", alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="close" size={18} color={cores.texto} />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </View>
  );

  if (naTela) {
    if (!visible) return null;
    return (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(28, 18, 12, 0.75)", zIndex: 10, elevation: 10 }]}>
        {sheet}
      </View>
    );
  }

  return (
    <FullScreenModal visible={visible} onClose={onClose} animationType={animationType}>
      <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === "ios"} style={{ flex: 1 }}>
        {sheet}
      </KeyboardAvoidingView>
    </FullScreenModal>
  );
}
