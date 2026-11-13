import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { mockBlocksData } from '../../state/mockDashboardData';
import { ContentArticle } from '../../types/dashboard';
import { useCores } from '../../lib/tema';
import { ArtigoCard } from '../../components/ArtigoCard';

export default function ArtigosScreen() {
  const cores = useCores();
  const router = useRouter();

  const artigos = mockBlocksData;

  // Agrupa os artigos por 'tag' (Ex: Nutrição, Exercício, Mental, Alongamento)
  const artigosPorTema = artigos.reduce((acc, artigo) => {
    if (!acc[artigo.tag]) acc[artigo.tag] = [];
    acc[artigo.tag].push(artigo);
    return acc;
  }, {} as Record<string, ContentArticle[]>);

  const temas = Object.keys(artigosPorTema);

  return (
    <SafeAreaView className="flex-1 bg-fundo">
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 border-b border-borda bg-cartao shadow-sm z-10">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 p-1">
          <Ionicons name="arrow-back" size={24} color={cores.texto} />
        </TouchableOpacity>
        <Text className="text-lg font-extrabold text-texto">Biblioteca Temática</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} className="flex-1">
        <View className="px-5 py-6">
          <Text className="text-base text-texto-suave mb-6">
            Navegue pelos temas e descubra conteúdos preparados especialmente para a sua gestação.
          </Text>

          {temas.map(tema => (
            <View key={tema} className="mb-8">
              {/* Título do Tema */}
              <View className="flex-row items-center mb-4">
                <View className="w-1.5 h-6 bg-[#C56A43] rounded-full mr-3" />
                <Text className="text-xl font-bold text-texto capitalize">{tema}</Text>
              </View>

              {/* Lista horizontal dos artigos daquele tema */}
              <ScrollView horizontal nestedScrollEnabled={true} showsHorizontalScrollIndicator={false} className="-mx-5 px-5">
                {artigosPorTema[tema].map(artigo => (
                  <ArtigoCard key={artigo.id} artigo={artigo} />
                ))}
              </ScrollView>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
