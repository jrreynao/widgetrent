// Este archivo transforma los datos JSON a un formato fácil de usar en React

export const categorias = [
  { id: "1", nombre: "chico (hatchback, compacto)" },
  { id: "2", nombre: "mediano (sedán, familiar)" },
  { id: "3", nombre: "grande (SUV, 7 puestos, camioneta)" }
];

export const vehiculos = [
  // Chico
  {
    id: "1",
    categoriaId: "1",
    nombre: "VW Gol Trend 3 Puertas - Manual",
    precio: 60000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733321425_1733321329_pngwing.com-10.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Maletas", texto: "1 Maleta" },
      { icono: "Puertas", texto: "3 Puertas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Dirección Asistida", texto: "Dirección Asistida" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "24",
    categoriaId: "1",
    nombre: "Voyage Highland - AUTOMATICO",
    precio: 60000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733931576_1733931569_Voyage-Highland-aut-2012.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "100",
    categoriaId: "1",
    nombre: "Renault Sandero (auto chico)",
    precio: 70000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/renault-sandero.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Maletas", texto: "2 Maletas" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "101",
    categoriaId: "1",
    nombre: "Fiat Mobi",
    precio: 70000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/fiat-mobi.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Maletas", texto: "1 Maleta" },
      { icono: "Puertas", texto: "5 Puertas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },

  {
    id: "25",
    categoriaId: "1",
    nombre: "Nissan Sentra cvt - AUTOMATICO",
    precio: 60000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733932526_1733932522_Nissan-Sentra-cvt-aut-2011.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },

  {
    id: "102",
    categoriaId: "2",
    nombre: "Fiat Cronos",
    precio: 80000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/fiat-cronos.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Maletas", texto: "3 Maletas" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },

  {
    id: "103",
    categoriaId: "2",
    nombre: "VW Vento",
    precio: 90000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/vw-vento.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Maletas", texto: "4 Maletas" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },

  {
    id: "26",
    categoriaId: "1",
    nombre: "Ford Focus 4 ptas EXE - AUTOMATICO",
    precio: 60000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733932621_1733932618_Ford-Focus-4-ptas-EXE-2013.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },

  {
    id: "104",
    categoriaId: "3",
    nombre: "Jeep Renegade",
    precio: 120000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/jeep-renegade.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Maletas", texto: "4 Maletas" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },

  {
    id: "105",
    categoriaId: "3",
    nombre: "Chevrolet Spin 7 puestos",
    precio: 120000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/chevrolet-spin.png",
    caracteristicas: [
      { icono: "Asientos", texto: "7 Asientos" },
      { icono: "Maletas", texto: "4 Maletas" },
      { icono: "Puertas", texto: "5 Puertas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado 3 Zonas" }
    ]
  },

  {
    id: "27",
    categoriaId: "1",
    nombre: "Chevrolet Agile - MANUAL",
    precio: 60000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733932844_1733932841_Chevrolet-Agile-Manual-2017.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },

  {
    id: "28",
    categoriaId: "1",
    nombre: "Vw Suran Confort - MANUAL",
    precio: 60000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733932958_1733932953_Vw-Suran-Confort-Manual-2013.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "29",
    categoriaId: "1",
    nombre: "Chevrolet Prisma - MANUAL",
    precio: 70000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733933116_1733933113_Chevrolet-Prisma-Manual-2017.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "31",
    categoriaId: "1",
    nombre: "Chevrolet Cobalt - AUTOMATICO",
    precio: 70000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733933372_1733933360_Chevrolet-Cobalt-Automatico-2013.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "32",
    categoriaId: "1",
    nombre: "Vw Bora TDI - MANUAL",
    precio: 70000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733933528_1733933524_Vw-Bora-TDI-Manual-2013.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "34",
    categoriaId: "1",
    nombre: "Renault Sandero Stepway con Navegador",
    precio: 70000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733933691_1733933688_Renault-Sandero-Stepway-2014.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "35",
    categoriaId: "1",
    nombre: "Chevrolet Prisma LT - MANUAL",
    precio: 60000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733933798_1733933794_Chevrolet-Prisma-LT-manual-2014.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  // Mediano
  {
    id: "5",
    categoriaId: "2",
    nombre: "Fiat CRONOS CVT full Precisión",
    precio: 80000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733436067_1733436027_443_272x151_upscayl_4x_realesrgan-x4plus.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Maletas", texto: "3 Maletas" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Dirección Asistida", texto: "Dirección Asistida" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "21",
    categoriaId: "2",
    nombre: "Fiat Cronos DRIVE CVT - AUTOMATICO",
    precio: 80000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733931288_1733931286_Fiat-Cronos-DRIVE-CVT-AUTOMATICO-2023.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Maletas", texto: "3 Maletas" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Dirección Asistida", texto: "Dirección Asistida" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "22",
    categoriaId: "2",
    nombre: "Fiat Cronos DRIVE - MANUAL",
    precio: 80000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733931329_1733931315_Fiat-Cronos-DRIVE-CVT-AUTOMATICO-2023.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Maletas", texto: "3 Maletas" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Dirección Asistida", texto: "Dirección Asistida" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "23",
    categoriaId: "2",
    nombre: "Renault Sandero Life - manual",
    precio: 75000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733931414_1733931412_Renault-Sandero-Life-2022-Manual.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "30",
    categoriaId: "2",
    nombre: "Renault Sandero - MANUAL",
    precio: 60000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733933203_1733933197_Renault-Sandero-manual-2017.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Dirección Asistida", texto: "Dirección Asistida" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  // Grande
  {
    id: "14",
    categoriaId: "3",
    nombre: "Amarox V6 extreme - AUTOMATICA",
    precio: 180000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733929852_1733929847_amarok.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "15",
    categoriaId: "3",
    nombre: "Ranger 3.2 xls 4x2 - MANUAL",
    precio: 150000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733930198_1733930193_Ranger-3.2-xls-4x2-manual-2021.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "16",
    categoriaId: "3",
    nombre: "Toyota Hilux DX pack cuero 4x4 - MANUAL",
    precio: 130000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733930461_1733930457_Toyota-Hilux-DX-pack-cuero-4x4-Manual-2015.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "17",
    categoriaId: "3",
    nombre: "Jeep Renegade Longitude 4x2 - AUTOMATICA",
    precio: 110000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733930546_1733930542_Jeep-Renegade-Longitude-4x2-aut-2021.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "18",
    categoriaId: "3",
    nombre: "HONDA CRV 4x2 - AUTOMATICA",
    precio: 90000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733930665_1733930656_HONDA-CRV-4x2-aut-2013.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "19",
    categoriaId: "3",
    nombre: "Toyota Corolla 2.0 XEI CVT - AUTOMATICO",
    precio: 100000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733930829_1733930791_Toyota-Corolla-2.0-XEI-CVT-AUT-2021.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "20",
    categoriaId: "3",
    nombre: "VW VENTO 2.5 Luxury - AUTOMATICO",
    precio: 80000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733931063_1733931060_VW-VENTO-2.5-Luxury-aut-2013.png",
    caracteristicas: [
      { icono: "Asientos", texto: "5 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Automático", texto: "Automático" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado" }
    ]
  },
  {
    id: "33",
    categoriaId: "3",
    nombre: "Chevrolet Spin 7 plazas - MANUAL",
    precio: 90000,
    imagen: "https://isracarent.com/wp-content/uploads/bookingpress/1733933596_1733933593_Chevrolet-Spin-7-plazas-manual-2012.png",
    caracteristicas: [
      { icono: "Asientos", texto: "7 Asientos" },
      { icono: "Puertas", texto: "4 Puertas" },
      { icono: "Maletas", texto: "5 Maletas" },
      { icono: "Manual", texto: "Manual" },
      { icono: "Airbag/ABS", texto: "Airbag/ABS" },
      { icono: "Mp3 Bluetooth", texto: "Mp3 Bluetooth" },
      { icono: "Aire Acondicionado", texto: "Aire Acondicionado 3 Zonas" }
    ]
  }
];
