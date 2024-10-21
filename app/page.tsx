"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ApiDialog } from '@/components/api-dialog';
import { ServerIcon } from 'lucide-react';

export default function Home() {
  const [company, setCompany] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [apiType, setApiType] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const companies = ['Company A', 'Company B', 'Company C'];
  const restaurants = ['Restaurant X', 'Restaurant Y', 'Restaurant Z'];
  const apiTypes = ['GET', 'POST', 'PUT', 'DELETE'];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">API Request Service</h1>
        <p className="text-xl text-muted-foreground">Execute various API requests with ease</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md space-y-4"
      >
        <Select
          placeholder="Select a company"
          options={companies}
          value={company}
          onValueChange={setCompany}
        />
        <Select
          placeholder="Select a restaurant"
          options={restaurants}
          value={restaurant}
          onValueChange={setRestaurant}
        />
        <Select
          placeholder="Select API request type"
          options={apiTypes}
          value={apiType}
          onValueChange={setApiType}
        />
        <Button
          className="w-full"
          onClick={() => setIsDialogOpen(true)}
          disabled={!company || !restaurant || !apiType}
        >
          <ServerIcon className="mr-2 h-4 w-4" />
          Execute API Request
        </Button>
      </motion.div>

      <ApiDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        company={company}
        restaurant={restaurant}
        apiType={apiType}
      />
    </main>
  );
}