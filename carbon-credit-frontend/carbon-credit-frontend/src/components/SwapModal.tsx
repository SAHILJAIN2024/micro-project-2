// File: components/SwapModal.tsx
"use client";
import React from "react";
import { Dialog } from "@headlessui/react";
import SwapCRX from "./SwapCRX";

export default function SwapModal({ amount, to, onClose }: any) {
  return (
    <Dialog open onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-6 w-96 z-10">
          <Dialog.Title className="text-xl font-semibold mb-4">Swap & Buy CRX</Dialog.Title>
          <SwapCRX preset={{ amount, to }} onSuccess={onClose} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
