import React, { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Search, FileText, FileImage, Check, X, Clock } from "lucide-react";
import { format } from "date-fns";
import AttachmentPreview from "./AttachmentPreview";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious, PaginationLink } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type StatusType = "Completed" | "Canceled" | "Rescheduled";

interface PartEntry {
  name: string;
  qty: number;
}

interface MaintenanceEntry {
  id: string;
  plate: string;
  model: string;
  category: string;
  serviceDate: Date;
  serviceType: string;
  description: string;
  parts: PartEntry[];
  cost: number;
  technician: string;
  status: StatusType;
  attachments: { name: string; url: string; type: string }[];
}

const mockData: MaintenanceEntry[] = [
  {
    id: "1",
    plate: "ABC-1234",
    model: "Toyota Corolla",
    category: "Sedan",
    serviceDate: new Date("2024-04-02"),
    serviceType: "Oil Change",
    description: "Changed engine oil and filter.",
    parts: [
      { name: "Oil Filter", qty: 1 },
      { name: "Engine Oil", qty: 4 }
    ],
    cost: 65,
    technician: "Smith Auto Garage",
    status: "Completed",
    attachments: [],
  },
  {
    id: "2",
    plate: "XYZ-9876",
    model: "Ford F-150",
    category: "Truck",
    serviceDate: new Date("2024-04-10"),
    serviceType: "Brake Inspection",
    description: "Front brake pads checked.",
    parts: [{ name: "Brake Pad (Front)", qty: 2 }],
    cost: 120,
    technician: "John's Workshop",
    status: "Completed",
    attachments: [
      {
        name: "invoice.pdf",
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        type: "application/pdf"
      }
    ],
  },
  {
    id: "3",
    plate: "LMN-5555",
    model: "Honda Civic",
    category: "Sedan",
    serviceDate: new Date("2024-04-12"),
    serviceType: "Tire Replacement",
    description: "Rear tires replaced.",
    parts: [
      { name: "Tire 205/55R16", qty: 2 }
    ],
    cost: 240,
    technician: "Wheel King",
    status: "Completed",
    attachments: [
      {
        name: "receipt.jpg",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
        type: "image/jpeg"
      },
    ],
  },
];

function exportToCSV(data: MaintenanceEntry[]) {
  const header = [
    "Plate Number",
    "Model",
    "Category",
    "Service Date",
    "Service Type",
    "Description",
    "Parts Replaced",
    "Cost",
    "Technician/Provider",
    "Status"
  ];
  const rows = data.map(entry => [
    entry.plate,
    entry.model,
    entry.category,
    format(entry.serviceDate, "yyyy-MM-dd"),
    entry.serviceType,
    entry.description.replace(/\n/g, " "),
    entry.parts.map(p => `${p.name} (x${p.qty})`).join("; "),
    entry.cost,
    entry.technician,
    entry.status
  ]);
  const csvContent =
    [header, ...rows]
      .map(e =>
        e
          .map(x => `"${typeof x === "string" ? x.replace(/"/g, '""') : x}"`)
          .join(",")
      )
      .join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "maintenance-history.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function exportToPDF() {
  window.print();
}

const statusLabel = {
  Completed: <span className="inline-flex gap-1 items-center text-green-700 bg-green-50 px-2 py-0.5 rounded text-xs"><Check className="h-3 w-3" />Completed</span>,
  Canceled: <span className="inline-flex gap-1 items-center text-red-700 bg-red-50 px-2 py-0.5 rounded text-xs"><X className="h-3 w-3" />Canceled</span>,
  Rescheduled: <span className="inline-flex gap-1 items-center text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs"><Clock className="h-3 w-3" />Rescheduled</span>,
};

const pageSize = 5;

const unique = (arr: string[]) => [...Array.from(new Set(arr))];

// Filtering helpers
function textMatch(str: string, q: string) {
  return str.toLowerCase().includes(q.toLowerCase());
}

const MaintenanceHistoryTable: React.FC = () => {
  const [query, setQuery] = useState("");
  const [service, setService] = useState("");
  const [technician, setTechnician] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [sortDesc, setSortDesc] = useState(true);

  const [page, setPage] = useState(1);

  // Simulate uploads if in-memory only
  const [attachments, setAttachments] = useState<{ [id: string]: { name: string; url: string; type: string }[] }>({});

  const filteredData = useMemo(() => {
    let rows = mockData;

    if (query) {
      rows = rows.filter(
        row =>
          textMatch(row.plate, query) ||
          textMatch(row.model, query) ||
          textMatch(row.description, query)
      );
    }
    if (vehicle) {
      rows = rows.filter(row => row.plate === vehicle);
    }
    if (service) {
      rows = rows.filter(row => row.serviceType === service);
    }
    if (technician) {
      rows = rows.filter(row => row.technician === technician);
    }
    if (dateRange.from) {
      rows = rows.filter(row => row.serviceDate >= dateRange.from!);
    }
    if (dateRange.to) {
      rows = rows.filter(row => row.serviceDate <= dateRange.to!);
    }

    // sort
    rows = rows.sort((a, b) =>
      sortDesc
        ? b.serviceDate.getTime() - a.serviceDate.getTime()
        : a.serviceDate.getTime() - b.serviceDate.getTime()
    );
    return rows;
  }, [query, vehicle, service, technician, dateRange, sortDesc]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pageRows = filteredData.slice((page - 1) * pageSize, page * pageSize);

  // For drop-downs
  const allVehicles = useMemo(() => unique(mockData.map(d => d.plate)), []);
  const allServices = useMemo(() => unique(mockData.map(d => d.serviceType)), []);
  const allTechnicians = useMemo(() => unique(mockData.map(d => d.technician)), []);

  const handleAttachmentUpload = (id: string, files: FileList) => {
    const current = attachments[id] || [];
    const newFiles = Array.from(files).map(f => ({
      name: f.name,
      url: URL.createObjectURL(f),
      type: f.type,
    }));
    setAttachments(prev => ({ ...prev, [id]: [...current, ...newFiles] }));
  };

  // Ensure page reset if filter changes
  React.useEffect(() => {
    setPage(1);
  }, [query, service, vehicle, technician, dateRange]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
        <div className="flex-1 flex flex-col md:flex-row gap-2">
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by plate, model, notes..."
            className="w-full md:w-60"
            startIcon={<Search className="h-4 w-4" />}
          />

          <select
            value={vehicle}
            onChange={e => setVehicle(e.target.value)}
            className="w-full md:w-40 rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">All Vehicles</option>
            {allVehicles.map((v, i) => (
              <option value={v} key={i}>{v}</option>
            ))}
          </select>
          <select
            value={service}
            onChange={e => setService(e.target.value)}
            className="w-full md:w-40 rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">All Service Types</option>
            {allServices.map((v, i) => (
              <option value={v} key={i}>{v}</option>
            ))}
          </select>
          <select
            value={technician}
            onChange={e => setTechnician(e.target.value)}
            className="w-full md:w-40 rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">All Technicians</option>
            {allTechnicians.map((v, i) => (
              <option value={v} key={i}>{v}</option>
            ))}
          </select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-40 px-2 justify-between text-left font-normal">
                <span>
                  {dateRange.from ? format(dateRange.from, "MMM d, yyyy") : "From"}
                  {" - "}
                  {dateRange.to ? format(dateRange.to, "MMM d, yyyy") : "To"}
                </span>
                <CalendarIcon className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="flex flex-col gap-2 p-2">
                <Calendar
                  mode="range"
                  selected={{
                    from: dateRange.from || undefined,
                    to: dateRange.to || undefined
                  }}
                  onSelect={range => setDateRange(range || {})}
                  className={cn("p-3 pointer-events-auto")}
                  initialFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDateRange({})}
                >
                  Clear
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button variant="outline" onClick={() => exportToCSV(filteredData)} size="sm">
            <FileText className="h-4 w-4 mr-1" /> Export CSV
          </Button>
          <Button variant="outline" onClick={exportToPDF} size="sm">
            <FileImage className="h-4 w-4 mr-1" /> Print/PDF
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Sort"
            onClick={() => setSortDesc(sd => !sd)}
            className="h-9 w-9"
            title={sortDesc ? "Sort ascending" : "Sort descending"}
          >
            {sortDesc ? (
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 15l-7-7-7 7" /></svg>
            ) : (
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9l7 7 7-7" /></svg>
            )}
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plate</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Parts Replaced</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Technician / Provider</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Attachments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.plate}</TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{format(row.serviceDate, "yyyy-MM-dd")}</TableCell>
                <TableCell>{row.serviceType}</TableCell>
                <TableCell>
                  <span title={row.description} className="block max-w-[180px] truncate">
                    {row.description}
                  </span>
                </TableCell>
                <TableCell>
                  {row.parts.length === 0
                    ? <span className="text-xs text-slate-400">None</span>
                    : row.parts.map((p, i) => (
                        <span key={i} className="block">{p.name} (x{p.qty})</span>
                      ))
                  }
                </TableCell>
                <TableCell>
                  ${row.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <span className="block whitespace-nowrap">{row.technician}</span>
                </TableCell>
                <TableCell>
                  {statusLabel[row.status]}
                </TableCell>
                <TableCell>
                  <AttachmentPreview
                    attachments={[
                      ...(row.attachments || []),
                      ...(attachments[row.id] || []),
                    ]}
                    onUpload={files => handleAttachmentUpload(row.id, files)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredData.length === 0 && (
          <div className="text-center p-8 text-slate-500">No maintenance history found.</div>
        )}
      </div>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={e => {
                  e.preventDefault();
                  setPage(p => Math.max(1, p - 1));
                }}
                aria-disabled={page === 1}
                tabIndex={page === 1 ? -1 : 0}
              />
            </PaginationItem>
            {[...Array(totalPages).keys()].map(i => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={i + 1 === page}
                  onClick={e => {
                    e.preventDefault();
                    setPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={e => {
                  e.preventDefault();
                  setPage(p => Math.min(totalPages, p + 1));
                }}
                aria-disabled={page === totalPages}
                tabIndex={page === totalPages ? -1 : 0}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default MaintenanceHistoryTable;
