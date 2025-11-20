import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

function AppContent() {
  const insets = useSafeAreaInsets();
  const [despesas, setDespesas] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [valorDespesa, setValorDespesa] = useState('');
  const [descricaoDespesa, setDescricaoDespesa] = useState('');
  const [valorReceita, setValorReceita] = useState('');
  const [descricaoReceita, setDescricaoReceita] = useState('');

  const adicionarDespesa = () => {
    if (valorDespesa && descricaoDespesa) {
      setDespesas([...despesas, { valor: parseFloat(valorDespesa), descricao: descricaoDespesa }]);
      setValorDespesa('');
      setDescricaoDespesa('');
    }
  };

  const adicionarReceita = () => {
    if (valorReceita && descricaoReceita) {
      setReceitas([...receitas, { valor: parseFloat(valorReceita), descricao: descricaoReceita }]);
      setValorReceita('');
      setDescricaoReceita('');
    }
  };

  const totalDespesas = despesas.reduce((acc, item) => acc + item.valor, 0);
  const totalReceitas = receitas.reduce((acc, item) => acc + item.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.titulo}>Finanças do Caminhoneiro</Text>

        <View style={styles.resumo}>
          <Text style={styles.resumoTexto}>Receitas: R$ {totalReceitas.toFixed(2)}</Text>
          <Text style={styles.resumoTexto}>Despesas: R$ {totalDespesas.toFixed(2)}</Text>
          <Text style={[styles.resumoTexto, styles.saldo, saldo >= 0 ? styles.positivo : styles.negativo]}>
            Saldo: R$ {saldo.toFixed(2)}
          </Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.subtitulo}>Adicionar Receita</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição (ex: Frete SP-RJ)"
            placeholderTextColor="#999"
            value={descricaoReceita}
            onChangeText={setDescricaoReceita}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={valorReceita}
            onChangeText={setValorReceita}
          />
          <TouchableOpacity style={styles.botao} onPress={adicionarReceita}>
            <Text style={styles.botaoTexto}>Adicionar Receita</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secao}>
          <Text style={styles.subtitulo}>Adicionar Despesa</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição (ex: Diesel)"
            placeholderTextColor="#999"
            value={descricaoDespesa}
            onChangeText={setDescricaoDespesa}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={valorDespesa}
            onChangeText={setValorDespesa}
          />
          <TouchableOpacity style={styles.botao} onPress={adicionarDespesa}>
            <Text style={styles.botaoTexto}>Adicionar Despesa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secao}>
          <Text style={styles.subtitulo}>Receitas Registradas</Text>
          {receitas.length === 0 ? (
            <Text style={styles.listaVazia}>Nenhuma receita registrada</Text>
          ) : (
            receitas.map((item, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemTexto}>{item.descricao}</Text>
                <Text style={styles.itemValor}>R$ {item.valor.toFixed(2)}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.secao}>
          <Text style={styles.subtitulo}>Despesas Registradas</Text>
          {despesas.length === 0 ? (
            <Text style={styles.listaVazia}>Nenhuma despesa registrada</Text>
          ) : (
            despesas.map((item, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemTexto}>{item.descricao}</Text>
                <Text style={styles.itemValor}>R$ {item.valor.toFixed(2)}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  resumo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resumoTexto: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  saldo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  positivo: {
    color: '#28a745',
  },
  negativo: {
    color: '#dc3545',
  },
  secao: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  botao: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTexto: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  itemValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  listaVazia: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
  },
});
