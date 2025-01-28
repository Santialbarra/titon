'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  type: 'ingreso' | 'gasto'
}

export function BusinessAccounts() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, 'id'>>({
    date: '',
    description: '',
    amount: 0,
    type: 'ingreso'
  })

  const handleAddTransaction = () => {
    setTransactions([...transactions, { ...newTransaction, id: Date.now().toString() }])
    setNewTransaction({ date: '', description: '', amount: 0, type: 'ingreso' })
  }

  const calculateTotal = (type: 'ingreso' | 'gasto') => 
    transactions
      .filter(t => t.type === type)
      .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="transactionDate">Fecha</Label>
          <Input
            id="transactionDate"
            type="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="transactionDescription">Descripción</Label>
          <Input
            id="transactionDescription"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="transactionAmount">Monto</Label>
          <Input
            id="transactionAmount"
            type="number"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({...newTransaction, amount: Number(e.target.value)})}
          />
        </div>
        <div>
          <Label htmlFor="transactionType">Tipo</Label>
          <select
            id="transactionType"
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'ingreso' | 'gasto'})}
            className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ingreso">Ingreso</option>
            <option value="gasto">Gasto</option>
          </select>
        </div>
      </div>
      <Button onClick={handleAddTransaction}>Agregar Transacción</Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Tipo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(t => (
            <TableRow key={t.id}>
              <TableCell>{t.date}</TableCell>
              <TableCell>{t.description}</TableCell>
              <TableCell>${t.amount.toFixed(2)}</TableCell>
              <TableCell>{t.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between">
        <div>Total Ingresos: ${calculateTotal('ingreso').toFixed(2)}</div>
        <div>Total Gastos: ${calculateTotal('gasto').toFixed(2)}</div>
        <div>Balance: ${(calculateTotal('ingreso') - calculateTotal('gasto')).toFixed(2)}</div>
      </div>
    </div>
  )
}

