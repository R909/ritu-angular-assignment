import { Component, computed, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterOutlet } from "@angular/router"
import { Header } from "./header/header"
import { ContentListing } from "./content-listing/content-listing"
import { Footer } from "./footer/footer"

type SortOrder = "az" | "za" | null

interface RewardItem {
  pk: number
  name: string
  points: number
  display_img_url: string
  quantity: number | null
  valid_until: string
  low_quantity: number | null
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule,Header,ContentListing,Footer],
  templateUrl: "./app.html",
  styleUrls: ["./app.scss"],
})
export class App {
  // Header/Footer
  year = new Date().getFullYear()

  // UI State
  searchTerm = signal<string>("")
  isSortOpen = signal<boolean>(false)
  sortOrder = signal<SortOrder>(null)

  // Left panel (UI only)
  categories = ["Electronics", "Gift Cards", "Home & Kitchen", "Fashion", "Travel", "Health & Beauty", "Sports"]
  appliedFilters = ["Under 500 pts", "Expiring soon"]

  // Sample data
  items = signal<RewardItem[]>([
    {
      pk: 101,
      name: "Wireless Earbuds",
      points: 1200,
      display_img_url: "",
      quantity: 14,
      valid_until: "2025-12-31T00:00:00",
      low_quantity: 10,
    },
    {
      pk: 102,
      name: "Stainless Water Bottle",
      points: 300,
      display_img_url: "",
      quantity: 7,
      valid_until: "2026-01-31T00:00:00",
      low_quantity: 10,
    },
    {
      pk: 103,
      name: "Travel Backpack",
      points: 1800,
      display_img_url: "",
      quantity: 0,
      valid_until: "2026-03-31T00:00:00",
      low_quantity: 5,
    },
    {
      pk: 104,
      name: "Bluetooth Speaker",
      points: 900,
      display_img_url: "",
      quantity: 5,
      valid_until: "2026-06-30T00:00:00",
      low_quantity: 10,
    },
    {
      pk: 105,
      name: "Coffee Gift Card",
      points: 450,
      display_img_url: "",
      quantity: 50,
      valid_until: "2026-02-28T00:00:00",
      low_quantity: 10,
    },
    {
      pk: 106,
      name: "Fitness Tracker",
      points: 2200,
      display_img_url: "",
      quantity: 2,
      valid_until: "2026-07-31T00:00:00",
      low_quantity: 5,
    },
    {
      pk: 107,
      name: "Scented Candle Set",
      points: 350,
      display_img_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80&auto=format&fit=crop",
      quantity: 11,
      valid_until: "2026-10-31T00:00:00",
      low_quantity: 8,
    },
    {
      pk: 108,
      name: "Noise-cancel Headphones",
      points: 3500,
      display_img_url: "https://images.unsplash.com/photo-1518449073235-22463c31fd50?w=800&q=80&auto=format&fit=crop",
      quantity: 0,
      valid_until: "2026-05-31T00:00:00",
      low_quantity: 10,
    },
    {
      pk: 109,
      name: "Portable Charger",
      points: 700,
      display_img_url: "https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=800&q=80&auto=format&fit=crop",
      quantity: 3,
      valid_until: "2026-04-30T00:00:00",
      low_quantity: 6,
    },
    {
      pk: 110,
      name: "Demo reward for Purchase Price",
      points: 150,
      display_img_url: "",
      quantity: 2,
      valid_until: "2026-01-15T00:00:00",
      low_quantity: 5,
    },
  ])

  // Derived list: filter by search then sort by name
  displayedItems = computed<RewardItem[]>(() => {
    const q = this.searchTerm().trim().toLowerCase()
    let arr = this.items().filter((it) => it.name.toLowerCase().includes(q))
    const order = this.sortOrder()
    if (order === "az") {
      arr = [...arr].sort((a, b) => a.name.localeCompare(b.name))
    } else if (order === "za") {
      arr = [...arr].sort((a, b) => b.name.localeCompare(a.name))
    }
    return arr
  })

  // UI actions
  openSort() {
    this.isSortOpen.set(true)
  }
  closeSort() {
    this.isSortOpen.set(false)
  }
  setSort(order: SortOrder) {
    this.sortOrder.set(order)
  }

  // Helpers
  imageUrl(item: RewardItem): string {
    return item.display_img_url && item.display_img_url.trim().length > 0
      ? item.display_img_url
      : "./assets/placeholder.jpg"
  }
  isOutOfStock(item: RewardItem): boolean {
    return (item.quantity ?? 0) === 0
  }
  isHighDemand(item: RewardItem): boolean {
    const qty = item.quantity
    const low = item.low_quantity
    if (qty == null || low == null) return false
    return qty > 0 && qty <= low
  }
  remainingText(item: RewardItem): string {
    return `Only ${item.quantity ?? 0} rewards left`
  }
}
