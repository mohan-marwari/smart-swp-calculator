import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Button, TextInput, Title, Surface } from 'react-native-paper';

export default function App() {
  const [inputs, setInputs] = useState({
    principal: '1000000', // Initial principal amount
    withdrawal: '10000',  // Monthly withdrawal amount
    rate: '8',            // Annual return rate (%)
    time: '10',           // Time in years
  });

  const [results, setResults] = useState<{ [key: string]: string } | null>(null);

  const calculateSWP = () => {
    const principal = parseFloat(inputs.principal);
    const withdrawal = parseFloat(inputs.withdrawal);
    const rate = parseFloat(inputs.rate) / 100 / 12;
    const months = parseFloat(inputs.time) * 12;

    let remainingPrincipal = principal;
    let totalWithdrawals = 0;
    for (let i = 0; i < months; i++) {
      remainingPrincipal = remainingPrincipal * (1 + rate) - withdrawal;
      if (remainingPrincipal < 0) {
        break;
      }
      totalWithdrawals += withdrawal;
    }

    setResults({
      "Total Investment": principal.toFixed(2),
      "Total Withdrawals": totalWithdrawals.toFixed(2),
      "Remaining Principal": Math.max(remainingPrincipal, 0).toFixed(2),
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ padding: 16 }}>
        <Title style={{ textAlign: 'center', marginBottom: 20 }}>SWP Calculator</Title>

        <Surface style={{ padding: 16, borderRadius: 8 }}>
          <TextInput
            label="Principal Amount (₹)"
            value={inputs.principal}
            onChangeText={(text) => setInputs({ ...inputs, principal: text })}
            keyboardType="numeric"
            mode="outlined"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Monthly Withdrawal (₹)"
            value={inputs.withdrawal}
            onChangeText={(text) => setInputs({ ...inputs, withdrawal: text })}
            keyboardType="numeric"
            mode="outlined"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Annual Return Rate (%)"
            value={inputs.rate}
            onChangeText={(text) => setInputs({ ...inputs, rate: text })}
            keyboardType="numeric"
            mode="outlined"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Time Period (Years)"
            value={inputs.time}
            onChangeText={(text) => setInputs({ ...inputs, time: text })}
            keyboardType="numeric"
            mode="outlined"
            style={{ marginBottom: 16 }}
          />
          <Button mode="contained" onPress={calculateSWP}>
            Calculate
          </Button>
        </Surface>

        {results && (
          <Surface style={{ padding: 16, borderRadius: 8, marginTop: 20 }}>
            {Object.entries(results).map(([key, value]) => (
              <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text>{key}:</Text>
                <Text>₹{value}</Text>
              </View>
            ))}
          </Surface>
        )}
      </View>
    </ScrollView>
  );
}
