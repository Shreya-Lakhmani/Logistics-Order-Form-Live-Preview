import {
  Plus,
  X,
  Package as PackageIcon,
  ShieldCheck,
  AlertTriangle,
  Truck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function OrderForm({
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
  onUpdate,
  onAddPackage,
  onRemovePackage,
  onUpdatePackage,
}) {
  return (
    <div className="space-y-6">

      {/* Shipment Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-xl border border-red-100"
      >
        <div className="flex items-center gap-2 mb-4">
          <Truck className="w-5 h-5 text-red-600" />
          <h2 className="text-red-900 font-semibold">
            Shipment Details
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">
              Order ID
            </label>
            <input
              type="text"
              value={orderId}
              readOnly
              className="w-full px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-gray-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">
              Shipment Date
            </label>
            <input
              type="date"
              value={shipmentDate}
              onChange={(e) =>
                onUpdate("shipmentDate", e.target.value)
              }
              className="w-full px-3 py-2 border border-red-200 rounded-lg"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                onUpdate("deliveryType", "standard")
              }
              className={`flex-1 py-2 rounded-lg ${
                deliveryType === "standard"
                  ? "bg-red-600 text-white"
                  : "border border-red-200"
              }`}
            >
              Standard
            </button>

            <button
              type="button"
              onClick={() =>
                onUpdate("deliveryType", "express")
              }
              className={`flex-1 py-2 rounded-lg ${
                deliveryType === "express"
                  ? "bg-orange-500 text-white"
                  : "border border-red-200"
              }`}
            >
              Express
            </button>
          </div>
        </div>
      </motion.div>

      {/* Sender Section */}
      <motion.div className="bg-white rounded-2xl p-6 shadow-xl border border-red-100">
        <h2 className="text-red-900 font-semibold mb-4">
          Sender Details
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Sender Name"
            value={consignorName}
            onChange={(e) =>
              onUpdate("consignorName", e.target.value)
            }
            className="w-full px-3 py-2 border border-red-200 rounded-lg"
          />

          <input
            type="text"
            placeholder="Address"
            value={consignorAddress}
            onChange={(e) =>
              onUpdate("consignorAddress", e.target.value)
            }
            className="w-full px-3 py-2 border border-red-200 rounded-lg"
          />

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="City"
              value={consignorCity}
              onChange={(e) =>
                onUpdate("consignorCity", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-red-200 rounded-lg"
            />

            <input
              type="text"
              placeholder="Pincode"
              value={consignorPincode}
              onChange={(e) =>
                onUpdate("consignorPincode", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-red-200 rounded-lg"
            />
          </div>
        </div>
      </motion.div>

      {/* Receiver Section */}
      <motion.div className="bg-white rounded-2xl p-6 shadow-xl border border-red-100">
        <h2 className="text-red-900 font-semibold mb-4">
          Receiver Details
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Receiver Name"
            value={consigneeName}
            onChange={(e) =>
              onUpdate("consigneeName", e.target.value)
            }
            className="w-full px-3 py-2 border border-red-200 rounded-lg"
          />

          <input
            type="text"
            placeholder="Address"
            value={consigneeAddress}
            onChange={(e) =>
              onUpdate("consigneeAddress", e.target.value)
            }
            className="w-full px-3 py-2 border border-red-200 rounded-lg"
          />

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="City"
              value={consigneeCity}
              onChange={(e) =>
                onUpdate("consigneeCity", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-red-200 rounded-lg"
            />

            <input
              type="text"
              placeholder="Pincode"
              value={consigneePincode}
              onChange={(e) =>
                onUpdate("consigneePincode", e.target.value)
              }
              className="flex-1 px-3 py-2 border border-red-200 rounded-lg"
            />
          </div>
        </div>
      </motion.div>

      {/* Package Section */}
      <motion.div className="bg-white rounded-2xl p-6 shadow-xl border border-red-100">
        <div className="flex items-center gap-2 mb-4">
          <PackageIcon className="w-5 h-5 text-red-600" />
          <h2 className="text-red-900 font-semibold">
            Package Information
          </h2>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-red-200 rounded-lg p-4 relative"
              >
                {packages.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      onRemovePackage(pkg.id)
                    }
                    className="absolute top-2 right-2 text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div className="mb-3 font-medium">
                  Package {index + 1}
                </div>

                {/* Label */}
                <input
                  type="text"
                  placeholder="Label"
                  value={pkg.label}
                  onChange={(e) =>
                    onUpdatePackage(
                      pkg.id,
                      "label",
                      e.target.value
                    )
                  }
                  className="w-full mb-2 px-3 py-2 border border-red-200 rounded-lg"
                />

                {/* Weight + Value */}
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={pkg.weight}
                    onChange={(e) =>
                      onUpdatePackage(
                        pkg.id,
                        "weight",
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 border border-red-200 rounded-lg"
                  />

                  <input
                    type="number"
                    placeholder="Declared Value (₹)"
                    value={pkg.value}
                    onChange={(e) =>
                      onUpdatePackage(
                        pkg.id,
                        "value",
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 border border-red-200 rounded-lg"
                  />
                </div>

                {/* Dimensions */}
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Length (cm)"
                    value={pkg.length}
                    onChange={(e) =>
                      onUpdatePackage(
                        pkg.id,
                        "length",
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 border border-red-200 rounded-lg"
                  />

                  <input
                    type="number"
                    placeholder="Width (cm)"
                    value={pkg.width}
                    onChange={(e) =>
                      onUpdatePackage(
                        pkg.id,
                        "width",
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 border border-red-200 rounded-lg"
                  />

                  <input
                    type="number"
                    placeholder="Height (cm)"
                    value={pkg.height}
                    onChange={(e) =>
                      onUpdatePackage(
                        pkg.id,
                        "height",
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 border border-red-200 rounded-lg"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button
            type="button"
            onClick={onAddPackage}
            className="w-full py-2 border-2 border-dashed border-red-300 rounded-lg text-red-700 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Package
          </button>
        </div>
      </motion.div>

      {/* Additional Options */}
      <motion.div className="bg-white rounded-2xl p-6 shadow-xl border border-red-100">
        <h2 className="text-red-900 font-semibold mb-4">
          Additional Options
        </h2>

        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={fragile}
            onChange={(e) =>
              onUpdate("fragile", e.target.checked)
            }
          />
          <AlertTriangle className="w-4 h-4 text-red-500" />
          Fragile
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={insurance}
            onChange={(e) =>
              onUpdate("insurance", e.target.checked)
            }
          />
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Insurance Required
        </label>
      </motion.div>

    </div>
  );
}