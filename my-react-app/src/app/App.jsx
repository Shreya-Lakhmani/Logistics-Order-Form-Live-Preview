import { useState } from 'react';
import { motion } from "framer-motion";
import { OrderForm } from './components/OrderForm';
import { ShipmentPreview } from './components/ShipmentPreview';

function generateOrderId() {
  return `ORD-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase()}`;
}

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export default function App() {
  const [orderId] = useState(generateOrderId());
  const [shipmentDate, setShipmentDate] = useState(getTodayDate());
  const [deliveryType, setDeliveryType] = useState('standard');

  const [consignorName, setConsignorName] = useState('');
  const [consignorAddress, setConsignorAddress] = useState('');
  const [consignorCity, setConsignorCity] = useState('');
  const [consignorPincode, setConsignorPincode] = useState('');

  const [consigneeName, setConsigneeName] = useState('');
  const [consigneeAddress, setConsigneeAddress] = useState('');
  const [consigneeCity, setConsigneeCity] = useState('');
  const [consigneePincode, setConsigneePincode] = useState('');

  const [packages, setPackages] = useState([
    {
      id: crypto.randomUUID(),
      label: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      value: '',
    },
  ]);

  const [fragile, setFragile] = useState(false);
  const [insurance, setInsurance] = useState(false);

  const handleUpdate = (field, value) => {
    switch (field) {
      case 'shipmentDate':
        setShipmentDate(value);
        break;
      case 'deliveryType':
        setDeliveryType(value);
        break;
      case 'consignorName':
        setConsignorName(value);
        break;
      case 'consignorAddress':
        setConsignorAddress(value);
        break;
      case 'consignorCity':
        setConsignorCity(value);
        break;
      case 'consignorPincode':
        setConsignorPincode(value);
        break;
      case 'consigneeName':
        setConsigneeName(value);
        break;
      case 'consigneeAddress':
        setConsigneeAddress(value);
        break;
      case 'consigneeCity':
        setConsigneeCity(value);
        break;
      case 'consigneePincode':
        setConsigneePincode(value);
        break;
      case 'fragile':
        setFragile(value);
        break;
      case 'insurance':
        setInsurance(value);
        break;
      default:
        break;
    }
  };

  const handleAddPackage = () => {
    setPackages([
      ...packages,
      {
        id: crypto.randomUUID(),
        label: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        value: '',
      },
    ]);
  };

  const handleRemovePackage = (id) => {
    if (packages.length > 1) {
      setPackages(packages.filter((pkg) => pkg.id !== id));
    }
  };

  const handleUpdatePackage = (id, field, value) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === id ? { ...pkg, [field]: value } : pkg
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 relative overflow-hidden">
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          
          {/* Left Panel */}
          <div className="w-full min-h-screen border-r border-red-100/50 bg-white/30 backdrop-blur-sm">
            <div className="px-6 lg:px-8 py-8">
              <OrderForm
                orderId={orderId}
                shipmentDate={shipmentDate}
                deliveryType={deliveryType}
                consignorName={consignorName}
                consignorAddress={consignorAddress}
                consignorCity={consignorCity}
                consignorPincode={consignorPincode}
                consigneeName={consigneeName}
                consigneeAddress={consigneeAddress}
                consigneeCity={consigneeCity}
                consigneePincode={consigneePincode}
                packages={packages}
                fragile={fragile}
                insurance={insurance}
                onUpdate={handleUpdate}
                onAddPackage={handleAddPackage}
                onRemovePackage={handleRemovePackage}
                onUpdatePackage={handleUpdatePackage}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full min-h-screen bg-gradient-to-br from-red-50/50 via-white/50 to-pink-50/50 backdrop-blur-sm">
            <div className="px-6 lg:px-8 py-8">
              <ShipmentPreview
                orderId={orderId}
                shipmentDate={shipmentDate}
                deliveryType={deliveryType}
                consignorName={consignorName}
                consignorAddress={consignorAddress}
                consignorCity={consignorCity}
                consignorPincode={consignorPincode}
                consigneeName={consigneeName}
                consigneeAddress={consigneeAddress}
                consigneeCity={consigneeCity}
                consigneePincode={consigneePincode}
                packages={packages}
                fragile={fragile}
                insurance={insurance}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}