"use client";

import { useMemo, useState } from "react";
import { menuItems, type MenuItem } from "@/lib/menu";
import { restaurantConfig, whatsappUrl } from "@/lib/restaurant-config";

type IconProps = { size?: number; className?: string };
const icon = (symbol: string) => function Icon({ size = 18, className = "" }: IconProps) { return <span aria-hidden="true" className={`inline-flex shrink-0 items-center justify-center ${className}`} style={{ width: size, height: size, fontSize: size }}>{symbol}</span>; };
const ArrowRight = icon("→"), Check = icon("✓"), Clock3 = icon("◷"), MapPin = icon("⌖"), Menu = icon("☰"), Minus = icon("−"), Phone = icon("☎"), Plus = icon("+"), ShoppingBag = icon("🛍"), Trash2 = icon("×"), X = icon("×");

type Cart = Record<string, number>;
type Details = { name: string; phone: string; address: string; area: string; instructions: string; mapLink: string };
const money = (value: number) => `₹${value}`;

export default function RestaurantPage() {
  const [cart, setCart] = useState<Cart>({}); const [drawer, setDrawer] = useState(false); const [mobileNav, setMobileNav] = useState(false);
  const [filter, setFilter] = useState<"All" | MenuItem["category"]>("All"); const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [details, setDetails] = useState<Details>({ name: "", phone: "", address: "", area: "", instructions: "", mapLink: "" });
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("cod");
  const lines = useMemo(() => menuItems.filter(i => cart[i.id]).map(item => ({ item, quantity: cart[item.id], subtotal: item.price * cart[item.id] })), [cart]);
  const itemCount = lines.reduce((a,l) => a + l.quantity, 0); const total = lines.reduce((a,l) => a + l.subtotal, 0);
  const update = (id: string, delta: number) => setCart(old => { const n = Math.max(0, (old[id] || 0) + delta); const copy = { ...old }; if (n) copy[id] = n; else delete copy[id]; return copy; });
  const addSelected = (item: MenuItem, quantity: number) => { update(item.id, quantity); setDrawer(true); };
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
 const openWhatsApp = (message: string) => {
  const number = restaurantConfig.whatsappNumber.replace(/\D/g, "");
  const text = encodeURIComponent(message);

  const appUrl = `whatsapp://send?phone=${number}&text=${text}`;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = `https://wa.me/${number}?text=${text}`;
    return;
  }

  window.location.href = appUrl;
};
  const placeOrder = () => {
    if (!lines.length) return; const delivery = orderType === "delivery";
    if (!details.name || !details.phone || (delivery && (!details.address || !details.area))) { alert("Please complete the required customer details before placing your order."); return; }
    const orderLines = lines.map((l, n) => `${n + 1}. ${l.item.name} × ${l.quantity} = ${money(l.subtotal)}`).join("\n");
    const message = `NEW ORDER \n${restaurantConfig.restaurantName}\n\nCustomer Name: ${details.name}\nPhone: ${details.phone}\n\nOrder Type: ${delivery ? "HOME DELIVERY" : "PICKUP / TAKEAWAY"}${delivery ? `\n\nDelivery Address:\n${details.address}\n${details.area}${details.mapLink ? `\nGoogle Maps: ${details.mapLink}` : ""}` : ""}\n\nORDER DETAILS:\n\n${orderLines}\n\nTOTAL: ${money(total)}
\n\nPAYMENT METHOD: ${paymentMethod === "upi" ? "ONLINE PAYMENT (UPI)" : "CASH ON DELIVERY"}
${paymentMethod === "upi" ? "\nUPI ID: 2867R7762J@mairtel\nCustomer will share payment screenshot after payment." : ""}
${details.instructions ? `\n\nAdditional Instructions:\n${details.instructions}` : ""}`;
    openWhatsApp(message);
  };
  return <main>
    <header className="fixed top-0 z-40 w-full border-b border-white/15 bg-ink/95 text-white backdrop-blur"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6"><button onClick={() => scroll("home")} className="font-display text-lg tracking-wide">BANGUS <span className="text-saffron">VALLEY</span></button><nav className="hidden items-center gap-6 text-sm text-stone-200 md:flex">{[["Home","home"],["Menu","menu"],["Our story","about"],["Delivery","delivery"],["Contact","contact"]].map(([label,id]) => <button key={id} onClick={() => scroll(id)} className="hover:text-white">{label}</button>)}</nav><div className="flex items-center gap-2"><a className="hidden rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white sm:block" href={whatsappUrl()} target="_blank">CHAT ON WHATSAPP</a><button aria-label="Open cart" onClick={() => setDrawer(true)} className="relative rounded-full border border-white/25 p-2 hover:bg-white/10"><ShoppingBag size={19}/>{itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-saffron text-[10px] font-bold">{itemCount}</span>}</button><button aria-label="Open navigation" onClick={() => setMobileNav(!mobileNav)} className="p-2 md:hidden">{mobileNav ? <X/> : <Menu/>}</button></div></div>{mobileNav && <div className="border-t border-white/10 px-4 py-4 md:hidden">{[["Home","home"],["Menu","menu"],["Our story","about"],["Delivery","delivery"],["Contact","contact"]].map(([label,id]) => <button key={id} onClick={() => {scroll(id);setMobileNav(false)}} className="block w-full py-2 text-left text-sm">{label}</button>)}</div>}</header>
    <section id="home" className="hero min-h-185 pt-20"><div className="hero-grid mx-auto grid min-h-165 max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_.92fr] lg:py-0"><div className="relative z-10 max-w-2xl text-white"><p className="mb-5 flex items-center gap-2 text-xs font-bold tracking-[.23em] text-amber-200"><span className="h-px w-10 bg-amber-200"/> KASHMIRI WAZWAN · KRALPORA</p><h1 className="hero-title font-display">{restaurantConfig.displayHeading}</h1><div className="hero-copy"><p>ALL KINDS OF KASHMIRI WAZWAN IS AVAILABLE HERE</p><p>EXPLORE AND ORDER YOUR FAVORITE DISH/WAZWAN</p></div><p className="mt-5 inline-block rounded-full border border-amber-200/40 bg-black/20 px-4 py-2 text-xs font-bold tracking-wider text-amber-100">HOME DELIVERY ALSO AVAILABLE</p><p className="mt-3 inline-block rounded-full border border-amber-200/40 bg-black/20 px-4 py-2 text-xs font-bold tracking-wider text-amber-100">
  🚕 CAB SERVICE ALSO AVAILABLE FROM 08:00 AM ONWARDS
</p><div className="mt-8 flex flex-wrap gap-3"><button onClick={() => scroll("menu")} className="button-primary">ORDER NOW <ArrowRight size={17}/></button><button onClick={() => scroll("menu")} className="button-ghost">VIEW MENU</button><a href={whatsappUrl()} target="_blank" className="button-whatsapp">CHAT ON WHATSAPP</a></div></div><div className="hero-dish hidden lg:block"><div className="hero-dish-label">KASHMIRI WAZWAN</div><img src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1100&q=90" alt="Kashmiri Wazwan feast"/><div className="hero-dish-caption"><span>CHOWKIBAL ROAD</span><strong>KRALPORA</strong></div></div></div></section>
  <section
  className="relative z-20 -mt-8 mx-auto grid max-w-6xl grid-cols-1 gap-0 overflow-hidden rounded-2xl text-white shadow-xl md:grid-cols-3"
  style={{ backgroundColor: "#263f32" }}
>
  {/* OPENING HOURS */}
  <div className="flex min-h-26.25 items-center gap-4 border-b border-white/15 p-5 md:border-b-0 md:border-r">
    <Clock3 size={24} className="shrink-0 text-amber-300" />

    <div>
      <p className="text-xs font-bold tracking-widest text-amber-200">
        OPENING HOURS
      </p>

      <p className="mt-1 text-sm font-semibold text-white">
        {restaurantConfig.openingHours}
      </p>
    </div>
  </div>

  {/* FIND US */}
  <div className="flex min-h-26.25 items-center gap-4 border-b border-white/15 p-5 md:border-b-0 md:border-r">
    <MapPin size={24} className="shrink-0 text-amber-300" />

    <div>
      <p className="text-xs font-bold tracking-widest text-amber-200">
        FIND US
      </p>

      <p className="mt-1 text-sm font-semibold text-white">
        {restaurantConfig.address}
      </p>
    </div>
  </div>

  {/* ORDER ONLINE */}
  <button
    onClick={() => scroll("delivery")}
    className="flex min-h-26.25 items-center justify-between p-5 text-left transition-colors hover:bg-white/10"
  >
    <span>
      <span className="block text-xs font-bold tracking-widest text-amber-200">
        ORDER ONLINE
      </span>

      <span className="mt-1 block text-sm font-semibold text-white">
        Fast WhatsApp ordering
      </span>
    </span>

    <ArrowRight size={22} className="text-amber-300" />
  </button>
</section>
    <section id="menu" className="section"><div className="mx-auto max-w-7xl px-4 sm:px-6"><p className="eyebrow">A taste of Kashmir</p><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><h2 className="section-title">The Wazwan menu</h2><div className="flex gap-2 overflow-auto">{(["All","Wazwan","Plates","Vegetarian"] as const).map(c => <button onClick={() => setFilter(c)} className={`filter ${filter === c ? "filter-active" : ""}`} key={c}>{c}</button>)}</div></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{menuItems.filter(i => filter === "All" || i.category === filter).map(item => <MenuCard key={item.id} item={item} onAdd={addSelected}/>)}</div></div></section>
    <section id="about" className="relative overflow-hidden bg-[#172b21] py-20 text-white">
  <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">

    {/* OWNER PHOTO */}
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-3 rounded-3xl border border-amber-400/40"></div>

      <img
        src="/images/restaurant-owner.png"
        alt="Owner of Bangus Valley Restaurant"
        className="relative h-120 w-full rounded-2xl object-cover object-top shadow-2xl"
      />

      <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-black/70 p-4 backdrop-blur-sm">
        <p className="text-xs font-bold tracking-[0.2em] text-amber-300">
          BANGUS VALLEY RESTAURANT
        </p>
        <p className="mt-1 font-display text-xl text-white">
          Chowkibal Road, Kralpora
        </p>
      </div>
    </div>

    {/* OWNER INTRODUCTION */}
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
        Meet the Owner
      </p>

      <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
        The Face Behind
        <span className="block text-amber-300">
          Bangus Valley Restaurant
        </span>
      </h2>

      <div className="mt-6 h-1 w-20 rounded-full bg-amber-400"></div>

      <p className="mt-7 max-w-xl text-base leading-8 text-stone-300">
        Welcome to Bangus Valley Restaurant, where the rich flavours
        and traditions of Kashmiri Wazwan come together.
        We are delighted to serve you delicious food with warmth,
        care and hospitality.
      </p>

      <p className="mt-4 max-w-xl text-base leading-8 text-stone-300">
        From traditional Rista and Goshtaba to Kabab, Chicken
        and other Kashmiri favourites, we look forward to welcoming
        you and serving you.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => scroll("menu")}
          className="button-primary"
        >
          EXPLORE OUR MENU <ArrowRight size={17}/>
        </button>

        <a
          href={whatsappUrl()}
          target="_blank"
          className="button-whatsapp"
        >
          CHAT WITH US
        </a>
      </div>
    </div>

  </div>
</section>
    <section id="delivery" className="section bg-cream"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mx-auto max-w-2xl text-center"><p className="eyebrow">Home delivery available</p><h2 className="section-title">From our kitchen to your door.</h2><p className="mt-4 text-stone-600">Choose your food, add quantities, share your delivery details, and send the complete order straight to WhatsApp.</p></div><div className="mt-10 grid gap-4 md:grid-cols-4">{[["01","Choose Food"],["02","Select Quantity"],["03","Enter Details"],["04","Send Order on WhatsApp"]].map(([n,t]) => <div className="rounded-xl border border-orange-100 bg-white p-6" key={n}><span className="text-sm font-bold text-saffron">{n}</span><h3 className="mt-7 font-display text-xl text-ink">{t}</h3></div>)}</div><div className="mt-9 text-center"><button onClick={() => {setDrawer(true)}} className="button-primary">START YOUR ORDER <ArrowRight size={17}/></button></div></div></section>
    <section id="contact" className="section"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2"><div><p className="eyebrow">Visit or contact us</p><h2 className="section-title">{restaurantConfig.restaurantName}</h2><p className="mt-5 flex items-center gap-3 text-lg text-stone-700"><MapPin className="text-saffron"/> {restaurantConfig.address}</p><p className="mt-3 flex items-center gap-3 text-stone-600"><Clock3 className="text-saffron"/> {restaurantConfig.openingHours}</p><div className="mt-8 flex flex-wrap gap-3"><a className="button-dark" href={`tel:${restaurantConfig.phone.replace(/\s/g, "")}`}><Phone size={16}/> CALL NOW</a><a className="button-whatsapp" target="_blank" href={whatsappUrl()}>CHAT ON WHATSAPP</a><a className="button-outline" target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantConfig.address)}`}>GET DIRECTIONS</a></div></div><a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantConfig.address)}`} className="map-card"><div><MapPin size={30}/><p className="mt-4 font-display text-2xl">Chowkibal Road<br/>Kralpora</p><span className="mt-4 inline-block text-xs font-bold tracking-wider">OPEN IN GOOGLE MAPS →</span></div></a></div></section>
    <footer className="bg-ink py-10 text-stone-300"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between"><div><p className="font-display text-xl text-white">BANGUS <span className="text-saffron">VALLEY</span></p><p className="mt-2 text-sm">Kashmiri Wazwan · {restaurantConfig.address}</p></div><div className="flex gap-5 text-xs font-bold"><button onClick={() => scroll("home")}>HOME</button><button onClick={() => scroll("menu")}>MENU</button><a href={whatsappUrl()} target="_blank" className="text-[#52df87]">CHAT ON WHATSAPP</a></div></div></footer>
    <button onClick={() => setDrawer(true)} className="fixed bottom-4 left-4 right-4 z-30 flex items-center justify-center gap-2 rounded-full bg-saffron px-5 py-4 text-sm font-bold text-white shadow-2xl sm:hidden"><ShoppingBag size={18}/> {itemCount ? `VIEW CART · ${money(total)}` : "ORDER NOW"}</button>
    {drawer && <CartDrawer
  lines={lines}
  total={total}
  count={itemCount}
  orderType={orderType}
  setOrderType={setOrderType}
  details={details}
  setDetails={setDetails}
  paymentMethod={paymentMethod}
  setPaymentMethod={setPaymentMethod}
  update={update}
  clear={() => setCart({})}
  close={() => setDrawer(false)}
  placeOrder={placeOrder}
/>}
  </main>;
}

function MenuCard({
  item,
  onAdd
}: {
  item: MenuItem;
  onAdd: (item: MenuItem, q: number) => void
}) {
  const [q, setQ] = useState(1);
  const [selecting, setSelecting] = useState(false);

  return (
    <article className="menu-card">

      {/* DISH IMAGE */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-[10px] font-bold tracking-wider text-white">
          {item.category}
        </span>
      </div>

      {/* DISH DETAILS */}
      <div className="flex flex-1 flex-col p-5">

        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-ink">
            {item.name}
          </h3>

          <p className="font-bold text-saffron">
            {money(item.price)}
          </p>
        </div>

        {item.available ? (
          <div className="mt-auto pt-5">

            {!selecting ? (

              /* BUY AND ADD TO CART BUTTONS */
              <div className="grid grid-cols-2 gap-2">

                <button
                  onClick={() => {
                    setQ(1);
                    setSelecting(true);
                  }}
                  className="rounded-lg bg-pine px-3 py-3 text-xs font-bold text-white transition hover:bg-green-900"
                >
                  BUY NOW
                </button>

                <button
                  onClick={() => onAdd(item, 1)}
                  className="rounded-lg border border-pine px-3 py-3 text-xs font-bold text-pine transition hover:bg-green-50"
                >
                  ADD TO CART
                </button>

              </div>

            ) : (

              /* QUANTITY SELECTION */
              <div className="rounded-xl border border-stone-200 bg-[#faf7ef] p-3">

                <p className="mb-3 text-center text-xs font-bold text-stone-700">
                  SELECT QUANTITY
                </p>

                <div className="flex items-center justify-center gap-5">

                  <button
                    onClick={() => setQ(Math.max(1, q - 1))}
                    className="grid h-9 w-9 place-items-center rounded-lg border bg-white text-lg font-bold text-pine"
                  >
                    −
                  </button>

                  <span className="text-lg font-bold text-ink">
                    {q}
                  </span>

                  <button
                    onClick={() => setQ(q + 1)}
                    className="grid h-9 w-9 place-items-center rounded-lg border bg-white text-lg font-bold text-pine"
                  >
                    +
                  </button>

                </div>

                <p className="mt-3 text-center text-sm font-bold text-pine">
                  Total: {money(item.price * q)}
                </p>

                <button
                  onClick={() => {
                    onAdd(item, q);
                    setSelecting(false);
                    setQ(1);
                  }}
                  className="mt-3 w-full rounded-lg bg-pine px-4 py-3 text-xs font-bold text-white hover:bg-green-900"
                >
                  CONTINUE TO CHECKOUT →
                </button>

                <button
                  onClick={() => setSelecting(false)}
                  className="mt-2 w-full py-2 text-xs font-semibold text-stone-500"
                >
                  CANCEL
                </button>

              </div>

            )}

          </div>
        ) : (
          <p className="mt-5 text-sm font-semibold text-red-600">
            Currently Unavailable
          </p>
        )}

      </div>
    </article>
  );
}

function CartDrawer({
  lines,
  total,
  count,
  orderType,
  setOrderType,
  details,
  setDetails,
  paymentMethod,
  setPaymentMethod,
  update,
  clear,
  close,
  placeOrder
}: {
  lines: { item: MenuItem; quantity: number; subtotal: number }[];
  total: number;
  count: number;
  orderType: "delivery" | "pickup";
  setOrderType: (x: "delivery" | "pickup") => void;
  details: Details;
  setDetails: (x: Details) => void;
  paymentMethod: "upi" | "cod";
  setPaymentMethod: (x: "upi" | "cod") => void;
  update: (id: string, d: number) => void;
  clear: () => void;
  close: () => void;
  placeOrder: () => void;
}) {
  const field = (
    key: keyof Details,
    label: string,
    required = false,
    type = "text"
  ) => (
    <label className="field">
      <span>
        {label}{required && " *"}
      </span>
      <input
        type={type}
        value={details[key]}
        onChange={e =>
          setDetails({ ...details, [key]: e.target.value })
        }
      />
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <aside className="flex h-full w-full max-w-xl flex-col bg-[#fffdf9] shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-5 py-5">
          <div>
            <p className="font-display text-2xl text-ink">Your order</p>
            <p className="text-xs text-stone-500">
              {count} item{count !== 1 && "s"}
            </p>
          </div>

          <button
            onClick={close}
            aria-label="Close cart"
            className="rounded-full p-2 hover:bg-stone-100"
          >
            <X />
          </button>
        </div>

        {/* CART CONTENT */}
        <div className="flex-1 overflow-y-auto p-5">

          {!lines.length ? (
            <div className="grid min-h-48 place-items-center text-center text-stone-500">
              <div>
                <ShoppingBag className="mx-auto mb-3" />
                <p>Your cart is waiting for something delicious.</p>
              </div>
            </div>
          ) : (
            <>
              {/* CART ITEMS */}
              <div className="space-y-3">
                {lines.map(({ item, quantity, subtotal }) => (
                  <div
                    className="flex items-center gap-3 border-b border-stone-200 pb-3"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="h-14 w-14 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-ink">
                        {item.name}
                      </p>

                      <p className="text-xs text-stone-500">
                        {money(item.price)} each
                      </p>

                      <div className="mt-2 quantity compact">
                        <button onClick={() => update(item.id, -1)}>
                          <Minus size={13} />
                        </button>

                        <span>{quantity}</span>

                        <button onClick={() => update(item.id, 1)}>
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold">
                        {money(subtotal)}
                      </p>

                      <button
                        onClick={() => update(item.id, -quantity)}
                        className="mt-2 text-stone-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={clear}
                className="mt-4 text-xs font-bold text-red-600"
              >
                CLEAR CART
              </button>

              {/* TOTAL */}
              <div className="my-6 border-t pt-5">
                <div className="flex justify-between font-display text-2xl text-ink">
                  <span>Total</span>
                  <span>{money(total)}</span>
                </div>
              </div>

              {/* CHECKOUT DETAILS */}
              <h3 className="font-display text-xl text-ink">
                Checkout details
              </h3>

              <p className="mt-1 text-xs text-stone-500">
                Required fields are marked with *
              </p>

              {/* ORDER TYPE */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOrderType("delivery")}
                  className={`order-type ${
                    orderType === "delivery" ? "selected" : ""
                  }`}
                >
                  <Check size={16} /> HOME DELIVERY
                </button>

                <button
                  onClick={() => setOrderType("pickup")}
                  className={`order-type ${
                    orderType === "pickup" ? "selected" : ""
                  }`}
                >
                  <Check size={16} /> PICKUP / TAKEAWAY
                </button>
              </div>

              {/* CUSTOMER INFORMATION */}
              <div className="mt-4 grid gap-3">
                {field("name", "Customer Name", true)}
                {field("phone", "Phone Number", true, "tel")}

                {orderType === "delivery" && (
                  <>
                    {field("address", "Complete Address", true)}
                    {field("area", "Area / Location", true)}
                    {field("mapLink", "Google Maps Location / Google Maps Link")}
                  </>
                )}

                <label className="field">
                  <span>Additional Instructions</span>

                  <textarea
                    value={details.instructions}
                    onChange={e =>
                      setDetails({
                        ...details,
                        instructions: e.target.value
                      })
                    }
                  />
                </label>
              </div>

              {/* PAYMENT METHOD */}
              <div className="mt-6">
                <h3 className="font-display text-xl text-ink">
                  Select Payment Method
                </h3>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`rounded-xl border p-4 text-sm font-bold ${
                      paymentMethod === "upi"
                        ? "border-green-700 bg-green-50 text-green-800"
                        : "border-stone-200 bg-white text-stone-700"
                    }`}
                  >
                    💳 Pay Online (UPI)
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`rounded-xl border p-4 text-sm font-bold ${
                      paymentMethod === "cod"
                        ? "border-green-700 bg-green-50 text-green-800"
                        : "border-stone-200 bg-white text-stone-700"
                    }`}
                  >
                    💵 Cash on Delivery
                  </button>
                </div>

                {/* UPI QR CODE */}
                {paymentMethod === "upi" && (
                  <div className="mt-4 rounded-xl border border-stone-200 bg-white p-4 text-center">

                    <p className="font-bold text-green-800">
                      Scan & Pay
                    </p>

                    <img
                      src="/images/restaurant-upi-qr.png"
                      alt="Bangus Valley Restaurant UPI QR Code"
                      className="mx-auto mt-3 w-full max-w-57.5 rounded-lg"
                    />

                    <p className="mt-3 text-sm font-bold text-stone-800">
                      UPI ID
                    </p>

                    <p className="mt-1 text-sm text-stone-600">
                      2867R7762J@mairtel
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText("2867R7762J@mairtel");
                        alert("UPI ID copied!");
                      }}
                      className="mt-3 rounded-lg bg-green-700 px-5 py-2 text-xs font-bold text-white"
                    >
                      COPY UPI ID
                    </button>

                    <p className="mt-3 text-xs leading-5 text-stone-500">
                      Complete your payment and share the payment
                      screenshot on WhatsApp. Your payment will be
                      confirmed after verification.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* PLACE ORDER */}
        {lines.length > 0 && (
          <div className="border-t bg-white p-5">
            <button
              onClick={placeOrder}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 text-sm font-bold text-white hover:bg-[#1dae54]"
            >
              PLACE ORDER ON WHATSAPP
              <ArrowRight size={17} />
            </button>

            <p className="mt-2 text-center text-[10px] text-stone-500">
              WhatsApp opens with your order ready to review and send.
            </p>
          </div>
        )}

      </aside>
    </div>
  );
}