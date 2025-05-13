import { Product, Category } from "@/types/product";

export const mockCategories: Category[] = [
  { 
    id: "cat1", 
    name: "Microcontrollers", 
    icon: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1pY3JvY29udHJvbGxlcnxlbnwwfHwwfHx8MA%3D%3D" 
  },
  { 
    id: "cat2", 
    name: "RF Modules", 
    icon: "https://images.unsplash.com/photo-1592664474898-99c9d44a3cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2lyZWxlc3MlMjBtb2R1bGV8ZW58MHx8MHx8fDA%3D" 
  },
  { 
    id: "cat3", 
    name: "Sensors", 
    icon: "https://images.unsplash.com/photo-1581092921461-eab10380dmk?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2Vuc29yfGVufDB8fDB8fHww" 
  },
  { 
    id: "cat4", 
    name: "Raspberry Pi", 
    icon: "https://images.unsplash.com/photo-1580246554356-6a35f1c5545f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFzcGJlcnJ5JTIwcGl8ZW58MHx8MHx8fDA%3D" 
  },
  { 
    id: "cat5", 
    name: "Power Supplies", 
    icon: "https://images.unsplash.com/photo-1607148029592-ff2c25b6118c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG93ZXIlMjBzdXBwbHl8ZW58MHx8MHx8fDA%3D" 
  },
  { 
    id: "cat6", 
    name: "Development Boards", 
    icon: "https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV2ZWxvcG1lbnQlMjBib2FyZHxlbnwwfHwwfHx8MA%3D%3D" 
  },
  { 
    id: "cat7", 
    name: "LED & Displays", 
    icon: "https://images.unsplash.com/photo-1520869578617-6b3a7d8319d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHx8MA%3D%3D" 
  },
  { 
    id: "cat8", 
    name: "IoT Modules", 
    icon: "https://images.unsplash.com/photo-1560661184-a75ae1bd5895?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGludGVybmV0JTIwb2YlMjB0aGluZ3N8ZW58MHx8MHx8fDA%3D" 
  },
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Arduino Uno R3 Development Board",
    description: "The Arduino Uno R3 is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins (of which 6 can be used as PWM outputs), 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header and a reset button.",
    price: 599,
    image: "https://placehold.co/400x400/1a46e5/white?text=Arduino+Uno",
    categoryId: "cat1",
    rating: 4.8,
    stock: 100,
    specs: {
      processor: "ATmega328P",
      memory: "32 KB Flash",
      digitalPins: 14,
      analogPins: 6,
      voltage: "5V",
    }
  },
  {
    id: "p2",
    name: "Raspberry Pi 4 Model B (4GB RAM)",
    description: "The Raspberry Pi 4 Model B is the latest product in the popular Raspberry Pi range of computers. It offers ground-breaking increases in processor speed, multimedia performance, memory, and connectivity compared to the prior-generation Raspberry Pi 3 Model B+.",
    price: 4999,
    image: "https://placehold.co/400x400/1a46e5/white?text=Raspberry+Pi+4",
    categoryId: "cat4",
    rating: 4.9,
    stock: 50,
    specs: {
      processor: "Broadcom BCM2711",
      memory: "4GB LPDDR4",
      usb: "2x USB 3.0 + 2x USB 2.0",
      video: "2x micro-HDMI",
      network: "Gigabit Ethernet",
    }
  },
  {
    id: "p3",
    name: "NodeMCU ESP8266 WiFi Module",
    description: "NodeMCU is an open-source firmware and development kit that helps you to prototype IoT products. The NodeMCU development board comes with the ESP8266 WiFi module built in, allowing you to connect to the internet easily.",
    price: 399,
    image: "https://placehold.co/400x400/1a46e5/white?text=NodeMCU",
    categoryId: "cat8",
    rating: 4.6,
    stock: 200,
    specs: {
      chip: "ESP8266",
      memory: "128 KB RAM",
      storage: "4MB Flash",
      voltage: "3.3V",
      wifi: "802.11 b/g/n",
    }
  },
  {
    id: "p4",
    name: "5V 2A Power Adapter for Arduino",
    description: "A reliable 5V 2A power adapter for Arduino boards and other electronic projects. Features overcurrent and overheat protection for safe operation.",
    price: 199,
    image: "https://placehold.co/400x400/1a46e5/white?text=Power+Adapter",
    categoryId: "cat5",
    rating: 4.5,
    stock: 150,
    specs: {
      input: "100-240V AC",
      output: "5V DC, 2A",
      connector: "5.5mm x 2.1mm barrel",
      protection: "Short circuit, overcurrent",
      length: "1.5m cable",
    }
  },
  {
    id: "p5",
    name: "HC-SR04 Ultrasonic Distance Sensor",
    description: "The HC-SR04 ultrasonic distance sensor is commonly used in robotics projects to detect obstacles and measure distance. It provides 2cm to 400cm non-contact measurement with a ranging accuracy of 3mm.",
    price: 99,
    image: "https://placehold.co/400x400/1a46e5/white?text=Ultrasonic+Sensor",
    categoryId: "cat3",
    rating: 4.7,
    stock: 300,
    specs: {
      range: "2cm - 400cm",
      accuracy: "3mm",
      voltage: "5V DC",
      current: "15mA",
      frequency: "40Hz",
    }
  },
  {
    id: "p6",
    name: "nRF24L01+ 2.4GHz RF Transceiver Module",
    description: "The nRF24L01+ is a wireless transceiver module operating at 2.4GHz. It is ideal for ultra-low power wireless applications. The module has an SPI interface for communication with microcontrollers like Arduino.",
    price: 149,
    image: "https://placehold.co/400x400/1a46e5/white?text=RF+Module",
    categoryId: "cat2",
    rating: 4.4,
    stock: 120,
    specs: {
      frequency: "2.4GHz ISM Band",
      range: "Up to 100m",
      dataRate: "250kbps, 1Mbps, 2Mbps",
      voltage: "1.9-3.6V",
      interface: "SPI",
    }
  },
  {
    id: "p7",
    name: "DHT11 Temperature & Humidity Sensor",
    description: "The DHT11 is a basic, low-cost digital temperature and humidity sensor. It uses a capacitive humidity sensor and a thermistor to measure the surrounding air, and outputs a digital signal on the data pin.",
    price: 79,
    image: "https://placehold.co/400x400/1a46e5/white?text=DHT11+Sensor",
    categoryId: "cat3",
    rating: 4.2,
    stock: 250,
    specs: {
      tempRange: "0-50°C",
      tempAccuracy: "±2°C",
      humidityRange: "20-80%",
      humidityAccuracy: "±5%",
      voltage: "3-5V DC",
    }
  },
  {
    id: "p8",
    name: "0.96 inch OLED Display Module",
    description: "This small OLED display offers high contrast and visibility with a resolution of 128x64 pixels. It communicates via I2C interface and is perfect for Arduino projects where you need a compact display.",
    price: 249,
    image: "https://placehold.co/400x400/1a46e5/white?text=OLED+Display",
    categoryId: "cat7",
    rating: 4.6,
    stock: 180,
    specs: {
      size: "0.96 inch",
      resolution: "128x64 pixels",
      interface: "I2C",
      voltage: "3.3-5V DC",
      color: "Blue/White",
    }
  },
  {
    id: "p9",
    name: "Breadboard 830 Points",
    description: "A solderless breadboard with 830 tie points for easy prototyping of electronic circuits. Features power rails on both sides and is compatible with standard jumper wires and components.",
    price: 129,
    image: "https://placehold.co/400x400/1a46e5/white?text=Breadboard",
    categoryId: "cat6",
    rating: 4.8,
    stock: 200,
    specs: {
      points: "830 tie points",
      terminal: "0.1 inch spacing",
      material: "ABS plastic",
      color: "White",
      dimensions: "16.5 x 5.5 x 0.85cm",
    }
  },
  {
    id: "p10",
    name: "ESP32 Development Board",
    description: "ESP32 is a series of low-cost, low-power system-on-chip microcontrollers with integrated Wi-Fi and dual-mode Bluetooth. This development board makes it easy to get started with ESP32 programming.",
    price: 499,
    image: "https://placehold.co/400x400/1a46e5/white?text=ESP32",
    categoryId: "cat1",
    rating: 4.7,
    stock: 150,
    specs: {
      chip: "ESP32-D0WDQ6",
      cores: "Dual-core 32-bit",
      wifi: "802.11 b/g/n",
      bluetooth: "BT 4.2 & BLE",
      flash: "4MB SPI flash",
    }
  }
];

export const mockBanners = [
  {
    id: "banner1",
    title: "Summer Sale - 20% Off All Arduino Products",
    image: "https://images.unsplash.com/photo-1597444153637-55edf2d3d1ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFyZHVpbm98ZW58MHx8MHx8fDA%3D",
    url: "/category/cat1"
  },
  {
    id: "banner2",
    title: "New Raspberry Pi 5 - Coming Soon",
    image: "https://images.unsplash.com/photo-1580050163344-46eb3b56b8bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFzcGJlcnJ5JTIwcGl8ZW58MHx8MHx8fDA%3D",
    url: "/category/cat4"
  },
  {
    id: "banner3",
    title: "IoT Starter Kits - Perfect for Beginners",
    image: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGludGVybmV0JTIwb2YlMjB0aGluZ3N8ZW58MHx8MHx8fDA%3D",
    url: "/category/cat8"
  }
];
