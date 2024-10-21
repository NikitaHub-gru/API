"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { CopyIcon, SendIcon } from 'lucide-react';

interface ApiDialogProps {
  isOpen: boolean;
  onClose: () => void;
  company: string;
  restaurant: string;
  apiType: string;
}

export function ApiDialog({ isOpen, onClose, company, restaurant, apiType }: ApiDialogProps) {
  const [usePhoneNumber, setUsePhoneNumber] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.org/users/1');
      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiResponse('Error fetching data');
    }
    setIsLoading(false);
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(apiResponse);
  };

  const isDeleteRequest = apiType === 'DELETE';

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>API Request Details</DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <h3 className="font-semibold">Company:</h3>
                <p>{company}</p>
              </div>
              <div>
                <h3 className="font-semibold">Restaurant:</h3>
                <p>{restaurant}</p>
              </div>
              <div>
                <h3 className="font-semibold">API Request Type:</h3>
                <p>{apiType}</p>
              </div>
              {isDeleteRequest && (
                <>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="usePhoneNumber"
                      checked={usePhoneNumber}
                      onCheckedChange={(checked) => setUsePhoneNumber(checked as boolean)}
                    />
                    <label htmlFor="usePhoneNumber" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Use Phone Number
                    </label>
                  </div>
                  {usePhoneNumber ? (
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  ) : (
                    <Input
                      type="text"
                      placeholder="Enter order ID"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                    />
                  )}
                </>
              )}
              <div className="flex justify-between items-center">
                <Button onClick={handleSendRequest} disabled={isLoading}>
                  <SendIcon className="mr-2 h-4 w-4" />
                  Send Request
                </Button>
              </div>
              {apiResponse && (
                <div className="mt-4 border border-white rounded-[20px] p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">API Response:</h4>
                    <Button variant="outline" size="sm" onClick={handleCopyResponse}>
                      <CopyIcon className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  <pre className="bg-gray-800 p-2 rounded-md overflow-auto max-h-[200px] text-sm">
                    <code className="text-green-400">{apiResponse}</code>
                  </pre>
                </div>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}