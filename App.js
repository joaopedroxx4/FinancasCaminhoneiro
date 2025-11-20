import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function App() {
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
    <ScrollView style={styles.container}>
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
          value={descricaoReceita}
          onChangeText={setDescricaoReceita}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor"
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
          value={descricaoDespesa}
          onChangeText={setDescricaoDespesa}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor"
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
        {receitas.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemTexto}>{item.descricao}</Text>
            <Text style={styles.itemValor}>R$ {item.valor.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.secao}>
        <Text style={styles.subtitulo}>Despesas Registradas</Text>
        {despesas.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemTexto}>{item.descricao}</Text>
            <Text style={styles.itemValor}>R$ {item.valor.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 50,
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
  },
  botao: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
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
  },
  itemValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
