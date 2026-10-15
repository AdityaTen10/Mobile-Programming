# QueueNepal - Teacher-Proof Guide
> If teacher points at ANY line, find that file below and read the answer in simple words.

## 1. App in 30 seconds (memorize this)
- This is **QueueNepal**, a token system for government offices.
- **4 main pages + 3 extra:** Home (`index.tsx`), Services (`services.tsx`), Birth (`birth.tsx`), Queue (`queue.tsx`), Records (`records.tsx`), Profile (`profile.tsx`).
- **Navigation:** `expo-router`. Every file in `src/app/` = one page. `router.push("/queue")` = go to queue page.
- **Data:** `src/data/store.tsx` is a fake database in phone memory using `Context`. All pages share token, queue, records.
- **Photo upload:** `expo-image-picker` opens gallery, returns `uri` (file path), we show with `<Image>` and save `uri` in records.
- **Colors:** Navy bg `#102A4E`, card `#1A3D62`, red button `#C84D5E` (matches your design photo).

## 2. File map - what each file does
| File | Job | Key code inside |
|------|-----|-----------------|
| `src/app/_layout.tsx` | Main door. Defines all pages + shares data | `Stack`, `TokenProvider`, `Stack.Screen` |
| `src/app/index.tsx` | Home. Shows your token, people ahead | `useApp()`, `router.push`, `TouchableOpacity`, `ScrollView` |
| `src/app/services.tsx` | Searchable list of 6 services | `useState`, `TextInput`, `FlatList`, `filter`, `Alert` |
| `src/app/birth.tsx` | Upload 2 photos + Book token | `ImagePicker`, `useState(null)`, `bookToken()` |
| `src/app/queue.tsx` | Who is ahead / behind you | `findIndex`, `slice`, `FlatList` |
| `src/app/records.tsx` | What docs + photos you sent | `Image`, `Modal`, `map` |
| `src/app/profile.tsx` | Pretty profile page | `ScrollView`, `Alert`, stats |
| `src/data/store.tsx` | Shared memory for whole app | `createContext`, `useState`, `useContext` |

---

## 3. Concepts teacher WILL ask (one-line answers)

**`import { View, Text } from "react-native"`**
= Bring boxes and words. `View` = div/box, `Text` = only way to show text. You cannot put text without `<Text>`.

**`TouchableOpacity`**
= A button that becomes see-through a little when touched. `onPress` = what happens on tap.

**`StyleSheet.create({...})`**
= CSS for phone. `flex:1` = take full screen, `flexDirection:"row"` = side-by-side, default is top-to-bottom.

**`useState`**
= Memory for one screen. Example: `const [search, setSearch] = useState("")` means `search` holds text, `setSearch` changes it and screen re-draws automatically.

**`router.push("/queue")`**
= Go to `queue.tsx` page. `/` = home. Back button comes free from `Stack`.

**`Stack` in `_layout.tsx`**
= Pile of pages. New page goes on top, back button removes it. `headerShown:false` hides top bar on home.

**`FlatList`**
= Smart list that only renders what you see on screen. Needs `data` (array), `keyExtractor` (unique id), `renderItem` (how each row looks). Better than copy-paste 100 rows.

**`TextInput`**
= Typing box. `value={search}` + `onChangeText={setSearch}` = controlled input, every letter updates state.

**`Alert.alert("Title","msg")`**
= Pop-up message box.

**`Image source={{uri}}`**
= Show photo from file path. `uri` = like `file:///cache/photo.jpg`.

**`Modal visible={...}`**
= Full-screen overlay. Used for zoomed photo view.

**`createContext + useContext` (store.tsx)**
= Walkie-talkie for all pages. Without it each page forgets what other page did. `TokenProvider` wraps app, `useApp()` lets any page read/write same queue/records.

**`export default function` vs `export function`**
= default = one main thing per file (the screen). Named = helper you import with `{ }` like `{ useApp }`.

**`{myToken}` with curly braces**
= Show a variable value inside text. Without `{}` it prints literally "myToken".

**`?.` and `??`**
= `queue[0]?.token` = if queue empty don't crash, give undefined. `?? "-"` = if undefined use "-".

**`map`, `filter`, `findIndex`, `slice`**
= `map` = change every item (make list UI). `filter` = keep only matching (search). `findIndex` = where am I in queue? `slice(0,myIndex)` = everyone before me.

---

## 4. Line-by-line: `_layout.tsx`
```tsx
import { Stack } from "expo-router";
```
= Bring navigation tool.

```tsx
import { TokenProvider } from "../data/store";
```
= Bring our shared memory.

```tsx
export default function RootLayout() { return (
  <TokenProvider><Stack ...>...</Stack></TokenProvider> )}
```
= Wrap everything so Home, Queue, Records see same token. If you remove Provider, `useApp()` will crash with "must be inside Provider".

```tsx
screenOptions={{ headerStyle:{backgroundColor:"#102A4E"}, headerTintColor:"#fff" }}
```
= Make top bar navy with white text on all pages.

```tsx
<Stack.Screen name="index" options={{headerShown:false}} />
```
= `index.tsx` is home, hide header because we made our own "QueueNepal" title. `name` must match filename.

## 5. Line-by-line: `index.tsx` (Home)
```tsx
const { myToken, peopleAhead, nowServing } = useApp();
```
= Take live values from shared store. If someone books new token, this auto-updates. Teacher Q: "Why not hardcode A-023?" A: "So Home changes when Birth page books A-026."

```tsx
const estTime = peopleAhead * 5 + 5;
```
= Fake math: 5 min per person + 5 min extra.

```tsx
<ScrollView><TouchableOpacity onPress={()=>router.push("/queue")}>
```
= Whole card is clickable, goes to queue. `ScrollView` allows scrolling on small phones.

```tsx
<View style={styles.row}> ... flexDirection:"row"
```
= Put two mini-cards side-by-side. `gap:10` = space between.

## 6. Line-by-line: `services.tsx`
```tsx
const ALL_SERVICES = [{id:"1", name:"Birth...", icon:"📄", goTo:"/birth"}, ...]
```
= Data array. Only Birth has `goTo`, others `null` = demo only.

```tsx
const [search, setSearch] = useState("");
const filtered = ALL_SERVICES.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
```
= Search logic. Lowercase both so "birth" matches "Birth". If search empty, `includes("")` = true, shows all.

```tsx
keyExtractor={(item)=>item.id}
```
= React needs stable id to avoid re-render bugs. Never use index if you can use id.

```tsx
const onTap = (item) => { if(item.goTo) router.push(item.goTo) else Alert.alert(...) }
```
= If real page exists go there, else say coming soon.

## 7. Line-by-line: `birth.tsx` (MOST IMPORTANT - teacher loves this)
```tsx
const [myPhoto, setMyPhoto] = useState<string|null>(null);
```
= `null` = no photo yet, `string` = file path after pick. `<string|null>` = TypeScript says it can be either.

```tsx
await ImagePicker.requestMediaLibraryPermissionsAsync();
if(!perm.granted){ Alert... return; }
```
= Ask "allow photos?" If denied, stop. Must await because permission takes time.

```tsx
await ImagePicker.launchImageLibraryAsync({ mediaTypes:["images"], allowsEditing:true, aspect:[3,4], quality:0.8 })
```
= Open gallery. `allowsEditing:true` = let user crop. `[3,4]` = passport shape. `quality 0.8` = smaller file but still clear.

```tsx
if(!result.canceled){ const uri = result.assets[0].uri; ... setMyPhoto(uri) }
```
= If user didn't press cancel, take first photo's path and save. `assets[0]` because we pick 1 photo.

```tsx
function PhotoBox({uri,onPick,label}){ return <TouchableOpacity onPress={onPick}>{uri ? <Image/> : <Text>Tap to upload</Text>}</TouchableOpacity> }
```
= Reusable box: shows image if exists, else upload text. This avoids writing same code twice.

```tsx
function onBook(){ if(!myPhoto||!parentPhoto){Alert...return;} const newToken = bookToken(..., [myPhoto,parentPhoto]); Alert... router.push("/records") }
```
= Guard: block booking without 2 photos. Then save + show token + give 2 buttons.

## 8. Line-by-line: `store.tsx` (brain)
```tsx
export type QueuePerson = { token:string; initial:string; service:string; isMe:boolean }
```
= Shape of one person in line. `initial` only (S) for privacy, not full name.

```tsx
let tokenCounter = 26;
const newToken = `A-0${tokenCounter}`; tokenCounter+=1;
```
= Token machine. Backticks `` ` `` allow `${}` inside. First new = A-026, next A-027.

```tsx
const nowServing = queue[0]?.token ?? "-";
```
= First in array = being served now.

```tsx
const myIndex = queue.findIndex(q=>q.token===myToken);
const peopleAhead = myIndex>0 ? myIndex-1 : 0;
```
= Example: queue [A-020,A-021,A-022,A-023-you] myIndex=3, peopleAhead=2 (skip the serving one). If you are first, 0 ahead.

```tsx
setQueue(old=>[...old.map(q=>q.token===oldToken?{...q,isMe:false}:q), {token:newToken,...isMe:true}])
```
= In one step: mark old "me" as false, add new "me" at end (behind everyone). `...` = copy array/object.

```tsx
setRecords(old=>[{id:Date.now().toString(),...}, ...old])
```
= Add new record on top. `Date.now()` = unique id.

## 9. Line-by-line: `queue.tsx`
```tsx
const ahead = queue.slice(0,myIndex); const behind = queue.slice(myIndex+1);
```
= Split queue into before-me and after-me. `slice` doesn't delete, just copies part.

```tsx
<View style={[styles.row, isMe && styles.meRow]}>
```
= Array styles = combine. If `isMe` true add red border. `isMe && style` = if false, ignore.

## 10. Line-by-line: `records.tsx`
```tsx
const [bigPhoto,setBigPhoto] = useState<string|null>(null);
```
= Which thumbnail is zoomed? null = none.

```tsx
{item.photos.map((uri,idx)=>(<TouchableOpacity onPress={()=>setBigPhoto(uri)}><Image source={{uri}}/><Text>{idx===0?"You":"Parent"}</Text>))}
```
= Show each saved photo. Tap sets it as big.

```tsx
<Modal visible={bigPhoto!==null} transparent><Image source={{uri:bigPhoto}} resizeMode="contain"/></Modal>
```
= Overlay viewer. `transparent` lets dark bg show. `contain` fits whole photo.

## 11. Line-by-line: `profile.tsx`
- `cover` = top rounded box, `avatar` = circle with "S", `borderRadius:45` on 90px box = perfect circle (half).
- `stats` = 3 boxes reading live `myToken, records.length, peopleAhead`.
- Menu rows all `TouchableOpacity` + `router.push` except Settings/Logout which are `Alert` demo.

## 12. 25 teacher rapid-fire Q&A (memorize bold)
1. **What is TouchableOpacity?** Pressable button that fades on touch, uses onPress.
2. **router.push vs Link?** push = code navigation on tap, Link = clickable text component. We use push.
3. **What is useState?** Screen memory that re-renders on change.
4. **Why useApp()?** To share token/queue between pages without passing props.
5. **What is Context?** Global box to avoid prop-drilling.
6. **What does FlatList do?** Efficient scroll list, renders only visible rows.
7. **keyExtractor why?** Unique key so React tracks rows correctly.
8. **How search works?** filter + includes + toLowerCase.
9. **How photo picked?** request permission → launchImageLibraryAsync → get assets[0].uri → setState.
10. **What is uri?** Local file path to image.
11. **How photo shown later?** uri saved in records.photos, displayed with `<Image source={{uri}}>` in Records.
12. **What is Modal?** Popup overlay for zoomed photo.
13. **How token generated?** Counter 26 → `A-0${counter}` → ++.
14. **How peopleAhead calculated?** findIndex of my token minus 1 (skip serving).
15. **What is nowServing?** queue[0].token.
16. **Why initial only?** Privacy, don't show full names in queue.
17. **Difference View/Text?** View=layout box, Text=display text (must wrap text).
18. **ScrollView vs FlatList?** ScrollView=small static content, FlatList=long dynamic list.
19. **What is StyleSheet?** Phone CSS, flexbox layout.
20. **What is Alert?** Native popup.
21. **async/await why?** Gallery/permission takes time, wait for result.
22. **What is `canceled`?** True if user closed gallery without picking.
23. **Why `aspect:[3,4]`?** Passport photo ratio.
24. **What happens if no photo and Book pressed?** Guard blocks with Alert.
25. **Where colors?** `#102A4E` navy bg, `#1A3D62` card, `#C84D5E` red button.

## 13. If you forget, say this (safe answers)
- "This `useState` stores X, when it changes the UI re-renders."
- "This `TouchableOpacity` makes it clickable and calls `router.push` to go to X page."
- "This comes from `store.tsx` shared context so all pages stay in sync."
- "This `map` loops the array to show UI for each item."
- "This `uri` is the photo path from image-picker, shown with `<Image>`."

Good luck. You know this app better than you think.
