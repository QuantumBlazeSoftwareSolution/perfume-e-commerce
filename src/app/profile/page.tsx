"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  MapPin,
  Heart,
  Shield,
  LogOut,
  Edit2,
  Check,
  ChevronDown,
  Trash2,
  X,
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_ORDERS = [
  {
    id: "#AU-2024-001",
    product: "LUMIÈRE ESSENCE — 50ml",
    date: "Oct 12, 2024",
    status: "Delivered",
    price: "$240",
    statusColor: "bg-green-500",
  },
  {
    id: "#AU-2024-002",
    product: "NOIR ABSOLU — 100ml",
    date: "Nov 05, 2024",
    status: "Shipped",
    price: "$310",
    statusColor: "bg-blue-500",
  },
  {
    id: "#AU-2024-003",
    product: "SANTAL RÊVE — 50ml",
    date: "Dec 01, 2024",
    status: "Processing",
    price: "$180",
    statusColor: "bg-[#B8965A]",
  }, // Used hex equivalent for the Processing pill since it should be gold
];

const INITIAL_ADDRESSES = [
  {
    id: 1,
    label: "Home",
    isDefault: true,
    name: "John Doe",
    address: "No. 12, Galle Road, Colombo 03, Western Province, Sri Lanka",
    phone: "+94 77 123 4567",
  },
  {
    id: 2,
    label: "Office",
    isDefault: false,
    name: "John Doe",
    address:
      "Level 5, World Trade Center, Colombo 01, Western Province, Sri Lanka",
    phone: "+94 77 123 4567",
  },
];

const DISTRICTS = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Moneragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
];

const TABS = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "locations", label: "Delivery Locations", icon: MapPin },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "security", label: "Security", icon: Shield },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("locations");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Addresses State
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);

  // Address Form State
  const [formData, setFormData] = useState({
    label: "Home",
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    district: "Colombo",
    province: "Western Province",
    postalCode: "",
    notes: "",
  });

  // Simple Wishlist State
  const [wishlist, setWishlist] = useState([]);

  // Handlers
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefaultAddress = (id: number) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.line1 || !formData.city)
      return;

    const newAddress = {
      id: editingAddressId || Date.now(),
      label: formData.label,
      isDefault: addresses.length === 0, // First address gets default
      name: formData.name,
      address: `${formData.line1}${
        formData.line2 ? `, ${formData.line2}` : ""
      }, ${formData.city}, ${formData.province}, Sri Lanka`,
      phone: formData.phone,
    };

    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingAddressId ? newAddress : a))
      );
    } else {
      setAddresses([...addresses, newAddress]);
    }

    setShowAddressForm(false);
    setEditingAddressId(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans text-[#141210] selection:bg-[#B8965A]/20">
      <div className="max-w-[960px] mx-auto px-6 pt-36 pb-12 flex flex-col md:flex-row gap-12">
        {/* === LEFT SIDEBAR === */}
        <div className="md:w-[280px] shrink-0 md:sticky top-32 h-fit flex flex-col">
          {/* Avatar Area */}
          <div className="flex flex-col items-center md:items-start mb-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-[96px] h-[96px] rounded-full flex items-center justify-center bg-[#E8D5B0] relative mb-5"
            >
              {/* Outer ring */}
              <div className="absolute inset-[-4px] rounded-full border-[2px] border-[#B8965A] opacity-60"></div>
              <span className="font-serif italic text-4xl text-[#B8965A]">
                JD
              </span>
            </motion.div>

            <h2 className="font-serif italic font-semibold text-[1.3rem] text-[#141210] mb-1">
              John Doe
            </h2>
            <p className="font-sans font-light text-[0.8rem] text-[#9A8C82] mb-3">
              johndoe@scentaraceylon.com
            </p>

            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#B8965A] to-[#D4AF37] rounded-full">
              <span className="font-sans font-medium text-[0.65rem] tracking-[0.1em] text-white uppercase">
                Gold Member
              </span>
            </div>
          </div>

          <div className="h-[1px] w-full bg-[#E8D5B0] mb-6 opacity-50"></div>

          {/* Nav Tabs */}
          <nav className="flex flex-row overflow-x-auto md:flex-col gap-2 pb-4 md:pb-0 scrollbar-hide">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-[10px] text-left transition-colors duration-200 shrink-0 md:shrink border-l-[2px] ${
                    isActive
                      ? "text-[#B8965A] font-medium border-[#B8965A] bg-[#B8965A]/[0.08]"
                      : "text-[#9A8C82] font-normal border-transparent hover:bg-[#B8965A]/5 hover:text-[#3D3530]"
                  }`}
                  style={{ fontSize: "0.88rem" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-x-0 inset-y-0 bg-[#B8965A]/[0.08] rounded-[10px]"
                    />
                  )}
                  <Icon
                    size={16}
                    className={`relative z-10 ${
                      isActive ? "text-[#B8965A]" : "text-[#9A8C82]"
                    }`}
                  />
                  <span className="relative z-10">{tab.label}</span>
                  {tab.id === "locations" && (
                    <span className="absolute right-3 w-2 h-2 rounded-full bg-[#B8965A] shadow-[0_0_8px_rgba(184,150,90,0.6)]"></span>
                  )}
                </button>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="group flex flex-row items-center gap-2 mt-8 md:mt-12 px-4 text-[#9A8C82] hover:text-[#C0392B] transition-colors"
          >
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 w-full"
            >
              <LogOut size={14} />
              <span className="font-sans font-light text-[0.8rem]">Logout</span>
            </motion.div>
          </button>
        </div>

        {/* === RIGHT CONTENT === */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {/* TAB 1: MY PROFILE */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 10, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <div className="flex justify-between items-center mb-8">
                  <h1 className="font-serif italic text-[1.6rem] text-[#141210]">
                    Personal Information
                  </h1>
                  <button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="flex items-center gap-2 text-[#9A8C82] hover:text-[#141210] transition-colors text-sm"
                  >
                    <Edit2 size={14} />
                    <span>Edit Profile</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {[
                    { label: "Full Name", value: "John Doe" },
                    { label: "Email Address", value: "johndoe@scentaraceylon.com" },
                    { label: "Phone Number", value: "+94 77 123 4567" },
                    { label: "Date of Birth", value: "14 May 1990" },
                    { label: "Gender", value: "Male" },
                  ].map((field, idx) => (
                    <div
                      key={idx}
                      className="border-b-[1px] border-[#B8965A]/15 pb-3 flex flex-col"
                    >
                      <label className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest mb-1">
                        {field.label}
                      </label>
                      {isEditingProfile ? (
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          defaultValue={field.value}
                          className="font-sans font-normal text-[0.95rem] text-[#141210] bg-transparent outline-none border-b border-transparent focus:border-[#B8965A] transition-colors"
                        />
                      ) : (
                        <span className="font-sans font-normal text-[0.95rem] text-[#141210]">
                          {field.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {isEditingProfile && (
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      className="mt-8 flex justify-end"
                    >
                      <button
                        onClick={() => {
                          setIsEditingProfile(false);
                          // mock success
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#B8965A] to-[#D4AF37] rounded-full text-white font-sans font-medium hover:opacity-90 transition-opacity text-sm"
                      >
                        <Check size={16} />
                        Save Changes
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* TAB 2: MY ORDERS */}
            {activeTab === "orders" && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: 10, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <h1 className="font-serif italic text-[1.6rem] text-[#141210]">
                    My Orders
                  </h1>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                  {[
                    "All",
                    "Processing",
                    "Shipped",
                    "Delivered",
                    "Cancelled",
                  ].map((filter, idx) => (
                    <button
                      key={filter}
                      className={`px-4 py-1.5 rounded-full text-[0.8rem] whitespace-nowrap transition-colors ${
                        idx === 0
                          ? "bg-[#B8965A] text-white font-medium"
                          : "bg-transparent text-[#9A8C82] border-[1px] border-[#B8965A]/15 hover:border-[#B8965A]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                  {MOCK_ORDERS.map((order, idx) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="bg-[#FFFFFF] border-[1px] border-[#B8965A]/15 rounded-[16px] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-[#B8965A] text-[0.75rem] font-medium mb-1 block">
                          {order.id}
                        </span>
                        <h3 className="font-sans font-normal text-[0.95rem] text-[#141210] mb-1">
                          {order.product}
                        </h3>
                        <p className="font-sans font-light text-[0.75rem] text-[#9A8C82]">
                          Placed on {order.date}
                        </p>
                      </div>

                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[0.65rem] uppercase tracking-widest font-medium text-white ${order.statusColor}`}
                        >
                          {order.status}
                        </span>
                        <div className="flex gap-4 items-center">
                          <span className="font-serif italic text-[1.2rem] text-[#B8965A]">
                            {order.price}
                          </span>
                          <button className="text-[0.8rem] text-[#141210] hover:text-[#B8965A] transition-colors group flex items-center gap-1">
                            Track Order
                            <span className="group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 3: DELIVERY LOCATIONS (IMPORTANT) */}
            {activeTab === "locations" && (
              <motion.div
                key="locations"
                initial={{ opacity: 0, x: 10, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h1 className="font-serif italic text-[1.6rem] text-[#141210]">
                      Delivery Locations
                    </h1>
                    <p className="font-sans font-light text-[0.85rem] text-[#9A8C82] mt-1">
                      Manage where your orders are delivered.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingAddressId(null);
                      setFormData({
                        label: "Home",
                        name: "",
                        phone: "",
                        line1: "",
                        line2: "",
                        city: "",
                        district: "Colombo",
                        province: "Western Province",
                        postalCode: "",
                        notes: "",
                      });
                      setShowAddressForm(true);
                    }}
                    className="flex items-center gap-2 border-[1px] border-[#B8965A] text-[#B8965A] px-5 py-2.5 rounded-full hover:bg-[#B8965A] hover:text-[#FFFFFF] transition-all text-sm font-medium"
                  >
                    <MapPin size={16} />
                    <span>+ Add New Address</span>
                  </button>
                </div>

                {/* Form Panel Slide Down */}
                <AnimatePresence>
                  {showAddressForm && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mb-8"
                    >
                      <div className="bg-[#FFFFFF] border-[1px] border-[#B8965A]/15 rounded-[16px] p-6 relative">
                        <button
                          onClick={() => setShowAddressForm(false)}
                          className="absolute top-4 right-4 text-[#9A8C82] hover:text-[#141210] transition-colors"
                        >
                          <X size={20} />
                        </button>

                        <h3 className="font-sans font-medium text-[1.1rem] text-[#141210] mb-6">
                          {editingAddressId
                            ? "Edit Address"
                            : "Add New Address"}
                        </h3>

                        <form
                          onSubmit={handleAddressSubmit}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Label */}
                            <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2">
                              <label className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest mb-1">
                                Address Label *
                              </label>
                              <div className="flex gap-2 mt-1">
                                {["Home", "Office", "Other"].map((lbl) => (
                                  <button
                                    key={lbl}
                                    type="button"
                                    onClick={() =>
                                      setFormData({ ...formData, label: lbl })
                                    }
                                    className={`px-3 py-1 rounded-full text-xs transition-colors ${
                                      formData.label === lbl
                                        ? "bg-[#B8965A] text-white"
                                        : "bg-[#F8F5F0] text-[#9A8C82] hover:bg-gray-100"
                                    }`}
                                  >
                                    {lbl}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Empty space to align grid */}
                            <div className="hidden md:block"></div>

                            {/* Full Name */}
                            <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2">
                              <label className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest mb-1">
                                Full Name *
                              </label>
                              <input
                                required
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({ ...formData, name: e.target.value })
                                }
                                type="text"
                                className="font-sans font-normal text-[0.95rem] text-[#141210] bg-transparent outline-none focus:border-b focus:border-[#B8965A] transition-all"
                              />
                            </div>

                            {/* Phone Number */}
                            <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2">
                              <label className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest mb-1">
                                Phone Number *
                              </label>
                              <input
                                required
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                  })
                                }
                                type="tel"
                                className="font-sans font-normal text-[0.95rem] text-[#141210] bg-transparent outline-none focus:border-b focus:border-[#B8965A] transition-all"
                              />
                            </div>

                            {/* Address Line 1 */}
                            <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2 md:col-span-2">
                              <label className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest mb-1">
                                Address Line 1 *
                              </label>
                              <input
                                required
                                value={formData.line1}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    line1: e.target.value,
                                  })
                                }
                                placeholder="Street, Building name"
                                type="text"
                                className="font-sans font-normal text-[0.95rem] text-[#141210] bg-transparent outline-none placeholder-[#9A8C82]/50 focus:border-b focus:border-[#B8965A] transition-all"
                              />
                            </div>

                            {/* Address Line 2 */}
                            <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2 md:col-span-2">
                              <label className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest mb-1">
                                Address Line 2 (Optional)
                              </label>
                              <input
                                value={formData.line2}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    line2: e.target.value,
                                  })
                                }
                                placeholder="Apt, Suite, Unit"
                                type="text"
                                className="font-sans font-normal text-[0.95rem] text-[#141210] bg-transparent outline-none placeholder-[#9A8C82]/50 focus:border-b focus:border-[#B8965A] transition-all"
                              />
                            </div>

                            {/* City */}
                            <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2">
                              <label className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest mb-1">
                                City *
                              </label>
                              <input
                                required
                                value={formData.city}
                                onChange={(e) =>
                                  setFormData({ ...formData, city: e.target.value })
                                }
                                type="text"
                                className="font-sans font-normal text-[0.95rem] text-[#141210] bg-transparent outline-none focus:border-b focus:border-[#B8965A] transition-all"
                              />
                            </div>

                            {/* District */}
                            <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2 relative">
                              <label className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest mb-1">
                                District *
                              </label>
                              <select
                                required
                                value={formData.district}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    district: e.target.value,
                                  })
                                }
                                className="font-sans font-normal text-[0.95rem] text-[#141210] bg-transparent outline-none appearance-none cursor-pointer"
                              >
                                {DISTRICTS.map((d) => (
                                  <option key={d} value={d}>
                                    {d}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown
                                size={14}
                                className="absolute right-0 bottom-3 text-[#9A8C82] pointer-events-none"
                              />
                            </div>

                            {/* Province */}
                            <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2">
                              <label className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest mb-1">
                                Province *
                              </label>
                              <input
                                readOnly
                                value={formData.province}
                                type="text"
                                className="font-sans font-normal text-[0.95rem] text-[#9A8C82] bg-transparent outline-none cursor-not-allowed"
                              />
                            </div>

                            {/* Postal Code */}
                            <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2">
                              <label className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest mb-1">
                                Postal Code
                              </label>
                              <input
                                value={formData.postalCode}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    postalCode: e.target.value,
                                  })
                                }
                                type="text"
                                className="font-sans font-normal text-[0.95rem] text-[#141210] bg-transparent outline-none focus:border-b focus:border-[#B8965A] transition-all"
                              />
                            </div>

                            {/* Notes */}
                            <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2 md:col-span-2">
                              <label className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest mb-1">
                                Delivery Notes
                              </label>
                              <textarea
                                value={formData.notes}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    notes: e.target.value,
                                  })
                                }
                                placeholder="E.g. Ring bell twice"
                                rows={1}
                                className="font-sans font-normal text-[0.95rem] text-[#141210] bg-transparent outline-none placeholder-[#9A8C82]/50 resize-none pt-1 focus:border-b focus:border-[#B8965A] transition-all"
                              />
                            </div>
                          </div>

                          {/* Error validation block omitted as basic HTML5 handles it for simplicity, but could add Framer Motion error blocks */}

                          <div className="flex items-center gap-4 border-t border-[#B8965A]/10 mt-6 pt-6">
                            <button
                              type="submit"
                              className="px-6 py-2.5 bg-gradient-to-r from-[#B8965A] to-[#D4AF37] text-white rounded-full font-sans font-medium hover:opacity-90 transition-opacity text-sm shadow-md shadow-[#B8965A]/20"
                            >
                              Save Address
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowAddressForm(false)}
                              className="text-[#9A8C82] font-sans text-sm hover:text-[#141210] transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Addresses List */}
                <div className="space-y-4">
                  <AnimatePresence>
                    {addresses.map((address, idx) => (
                      <motion.div
                        key={address.id}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, height: 0, marginBottom: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        whileHover={{ y: -2 }}
                        className={`bg-[#FFFFFF] border-[1px] border-[#B8965A]/15 rounded-[16px] relative transition-shadow hover:shadow-[0_4px_20px_rgba(184,150,90,0.10)] overflow-hidden ${
                          address.isDefault
                            ? "border-l-[3px] border-l-[#B8965A]"
                            : ""
                        }`}
                      >
                        <div className="p-5 md:px-6">
                          {address.isDefault && (
                            <div className="absolute top-5 right-5 px-3 py-1 bg-gradient-to-r from-[#B8965A] to-[#D4AF37] rounded-full">
                              <span className="text-[0.65rem] text-white uppercase tracking-widest font-medium">
                                Default
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 mb-3">
                            <MapPin size={14} className="text-[#B8965A]" />
                            <h3 className="font-sans font-medium text-[0.9rem] text-[#141210]">
                              {address.label}
                            </h3>
                          </div>

                          <div className="mt-3">
                            <p className="font-sans font-normal text-[0.88rem] text-[#141210] mb-1">
                              {address.name}
                            </p>
                            <p className="font-sans font-light text-[0.85rem] text-[#9A8C82] leading-[1.6] mb-1 max-w-[90%] md:max-w-[70%]">
                              {address.address}
                            </p>
                            <p className="font-sans font-light text-[0.82rem] text-[#9A8C82]">
                              {address.phone}
                            </p>
                          </div>
                        </div>

                        {/* Action Row */}
                        <div className="border-t-[1px] border-[#B8965A]/15 px-5 md:px-6 py-3 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {!address.isDefault && (
                              <button
                                onClick={() => handleSetDefaultAddress(address.id)}
                                className="font-sans font-normal text-[0.78rem] text-[#B8965A] hover:opacity-80 transition-opacity"
                              >
                                Set as Default
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => {
                                setEditingAddressId(address.id);
                                setFormData({
                                  label: address.label,
                                  name: address.name,
                                  phone: address.phone,
                                  line1: address.address.split(",")[0] || "",
                                  line2: "",
                                  city: address.address.split(",")[1]?.trim() || "Colombo",
                                  district: "Colombo",
                                  province: "Western Province",
                                  postalCode: "",
                                  notes: "",
                                });
                                setShowAddressForm(true);
                                window.scrollTo({ top: 100, behavior: "smooth" });
                              }}
                              className="font-sans font-normal text-[0.78rem] text-[#141210] hover:text-[#B8965A] transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="font-sans font-normal text-[0.78rem] text-[#9A8C82] hover:text-[#C0392B] transition-colors flex items-center gap-1 group"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* TAB 4: WISHLIST */}
            {activeTab === "wishlist" && (
              <motion.div
                key="wishlist"
                initial={{ opacity: 0, x: 10, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <h1 className="font-serif italic text-[1.6rem] text-[#141210]">
                    Wishlist
                  </h1>
                </div>

                {wishlist.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                    <Heart
                      size={80}
                      className="text-[#E8D5B0] mb-6 outline-[1px]"
                      strokeWidth={1}
                    />
                    <h2 className="font-serif italic text-[1.4rem] text-[#9A8C82] mb-3">
                      Your wishlist is empty
                    </h2>
                    <button className="text-[#B8965A] font-sans text-[0.9rem] hover:opacity-80 border-b border-[#B8965A] pb-0.5 transition-opacity mt-2">
                      Discover Fragrances &rarr;
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Items would go here if not empty */}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 5: SECURITY */}
            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 10, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <div className="flex justify-between items-center mb-8">
                  <h1 className="font-serif italic text-[1.6rem] text-[#141210]">
                    Security
                  </h1>
                </div>

                {/* Change Password */}
                <div className="mb-12">
                  <h3 className="font-sans font-medium text-[1.1rem] text-[#141210] mb-6">
                    Change Password
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="font-sans font-normal text-[0.95rem] text-[#141210] bg-transparent outline-none placeholder-[#9A8C82]/60 focus:border-b focus:border-[#B8965A] transition-all"
                      />
                    </div>
                    {/* empty cell for layout on desktop */}
                    <div className="hidden md:block"></div>

                    <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2">
                      <input
                        type="password"
                        placeholder="New Password"
                        className="font-sans font-normal text-[0.95rem] text-[#141210] bg-transparent outline-none placeholder-[#9A8C82]/60 focus:border-b focus:border-[#B8965A] transition-all"
                      />
                    </div>
                    <div className="flex flex-col border-b-[1px] border-[#B8965A]/15 pb-2">
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="font-sans font-normal text-[0.95rem] text-[#141210] bg-transparent outline-none placeholder-[#9A8C82]/60 focus:border-b focus:border-[#B8965A] transition-all"
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <button className="px-6 py-2.5 border-[1px] border-[#B8965A] text-[#B8965A] rounded-full font-sans font-medium hover:bg-[#B8965A] hover:text-white transition-colors text-sm">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Login Sessions */}
                <div className="mb-12">
                  <h3 className="font-sans font-medium text-[1.1rem] text-[#141210] mb-4">
                    Login Sessions
                  </h3>
                  <div className="bg-[#FFFFFF] rounded-[16px] border-[1px] border-[#B8965A]/15 overflow-hidden">
                    <div className="grid grid-cols-4 px-5 py-3 border-b-[1px] border-[#B8965A]/10 bg-[#B8965A]/5">
                      <span className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest col-span-1">
                        Device
                      </span>
                      <span className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest col-span-1">
                        Location
                      </span>
                      <span className="font-sans font-light text-[0.72rem] text-[#9A8C82] uppercase tracking-widest col-span-1">
                        Last Active
                      </span>
                      <span className="col-span-1"></span>
                    </div>
                    <div className="grid grid-cols-4 px-5 py-4 items-center border-b-[1px] border-[#B8965A]/10">
                      <span className="font-sans text-[0.85rem] text-[#141210] col-span-1">
                        Mac OS Safari
                      </span>
                      <span className="font-sans text-[0.85rem] text-[#9A8C82] col-span-1">
                        Colombo, LK
                      </span>
                      <span className="font-sans text-[0.85rem] text-[#9A8C82] col-span-1">
                        Active now
                      </span>
                      <button className="font-sans text-[0.8rem] text-[#C0392B] hover:opacity-80 transition-opacity col-span-1 text-right w-full block">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-[#C0392B]/[0.05] border-l-[3px] border-[#C0392B] p-6 rounded-r-[16px]">
                  <h3 className="font-sans font-medium text-[1.1rem] text-[#C0392B] mb-2 cursor-default">
                    Danger Zone
                  </h3>
                  <p className="font-sans font-light text-[0.85rem] text-[#3D3530] mb-6">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                  <button className="px-5 py-2.5 border-[1px] border-[#C0392B] text-[#C0392B] rounded-full font-sans text-sm hover:bg-[#C0392B] hover:text-white transition-colors bg-transparent">
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
