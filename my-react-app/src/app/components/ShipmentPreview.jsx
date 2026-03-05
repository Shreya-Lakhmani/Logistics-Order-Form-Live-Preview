import { Package as PackageIcon, AlertTriangle, ShieldCheck, Calendar, Hash, ArrowDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export function ShipmentPreview({
  orderId,
  shipmentDate,
  deliveryType,
  consignorName,
  consignorAddress,
  consignorCity,
  consignorPincode,
  consigneeName,
  consigneeAddress,
  consigneeCity,
  consigneePincode,
  packages,
  fragile,
  insurance,
}) {

  const totalPackages = packages.length;

  const totalWeight = packages.reduce(
    (sum, pkg) => sum + (parseFloat(pkg.weight) || 0),
    0
  );

  const totalValue = packages.reduce(
    (sum, pkg) => sum + (parseFloat(pkg.value) || 0),
    0
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-red-200 sticky top-8 relative overflow-hidden"
    >

      {/* Header */}
      <div className="border-b border-red-200 pb-6 mb-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-red-600" />
            <h2 className="text-red-900">Shipment Preview</h2>
          </div>

          <div
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              deliveryType === 'express'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-gradient-to-r from-red-600 to-red-700 text-white'
            }`}
          >
            {deliveryType === 'express' ? '⚡ Express' : '📦 Standard'}
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
            <Hash className="w-4 h-4 text-red-600" />
            <span>Order ID:</span>
            <span className="font-mono font-medium">{orderId}</span>
          </div>

          <div className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
            <Calendar className="w-4 h-4 text-red-600" />
            <span>Shipment Date:</span>
            <span className="font-medium">{formatDate(shipmentDate)}</span>
          </div>
        </div>
      </div>

      {/* Sender */}
      <div className="mb-6">
        <div className="bg-red-50 rounded-xl p-4 border border-red-200 mb-4">
          <div className="text-sm font-bold mb-2">FROM (Sender)</div>
          <div className="font-semibold">
            {consignorName || 'Not specified'}
          </div>
          {consignorAddress && (
            <div className="text-sm">{consignorAddress}</div>
          )}
          {(consignorCity || consignorPincode) && (
            <div className="text-sm">
              {consignorCity}
              {consignorCity && consignorPincode && ', '}
              {consignorPincode}
            </div>
          )}
        </div>

        <div className="flex justify-center my-4">
          <ArrowDown className="w-5 h-5 text-red-500" />
        </div>

        {/* Receiver */}
        <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
          <div className="text-sm font-bold mb-2">TO (Receiver)</div>
          <div className="font-semibold">
            {consigneeName || 'Not specified'}
          </div>
          {consigneeAddress && (
            <div className="text-sm">{consigneeAddress}</div>
          )}
          {(consigneeCity || consigneePincode) && (
            <div className="text-sm">
              {consigneeCity}
              {consigneeCity && consigneePincode && ', '}
              {consigneePincode}
            </div>
          )}
        </div>
      </div>

      {/* Packages */}
      {packages.length > 0 && (
        <div className="mb-6">
          <div className="text-sm font-bold mb-3">
            Packages ({totalPackages})
          </div>

          <div className="space-y-2">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className="bg-gray-50 rounded-lg p-3 border border-red-200"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    {pkg.label || `Package ${index + 1}`}
                  </span>
                  {pkg.weight && (
                    <span className="text-red-700 font-semibold">
                      {pkg.weight} kg
                    </span>
                  )}
                </div>

                {(pkg.length || pkg.width || pkg.height) && (
                  <div className="text-xs text-gray-600">
                    {pkg.length || 0} × {pkg.width || 0} × {pkg.height || 0} cm
                  </div>
                )}

                {pkg.value && (
                  <div className="text-sm font-semibold text-red-700 mt-1">
                    ₹{parseFloat(pkg.value).toLocaleString('en-IN')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="border-t border-red-200 pt-6 mb-6">
        <div className="text-sm font-bold mb-3">Summary</div>

        <div className="space-y-2 text-sm bg-red-50 p-4 rounded-xl border border-red-200">
          <div className="flex justify-between">
            <span>Total Packages</span>
            <span className="font-bold">{totalPackages}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Weight</span>
            <span className="font-bold">{totalWeight.toFixed(2)} kg</span>
          </div>

          <div className="flex justify-between">
            <span>Total Declared Value</span>
            <span className="font-bold text-red-700">
              ₹{totalValue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Special Handling */}
      {(fragile || insurance) && (
        <div className="border-t border-red-200 pt-6">
          <div className="text-sm font-bold mb-3">Special Handling</div>

          <div className="flex gap-2 flex-wrap">
            {fragile && (
              <div className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-semibold">
                <AlertTriangle className="w-4 h-4" />
                Fragile
              </div>
            )}

            {insurance && (
              <div className="flex items-center gap-1 px-3 py-2 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Insured
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}