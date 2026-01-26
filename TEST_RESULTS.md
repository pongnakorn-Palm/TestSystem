# 🧪 Bank Upload Feature - Test Results

**วันที่ทดสอบ:** 26 มกราคม 2026
**ผู้ทดสอบ:** Claude Code
**สถานะ:** 🔄 In Progress

---

## ✅ Server Status

### Backend (Port 3000)
- ✅ Status: **Running**
- ✅ Health Check: **OK**
- ✅ Database: **Connected**
- ✅ Main System DB: **Connected**

### Frontend (Port 5173)
- ✅ Status: **Running**
- ✅ Vite Server: **Ready in 235ms**
- ✅ URL: http://localhost:5173/

---

## 🔧 Technical Checks

### Backend Implementation
- ✅ `@aws-sdk/client-s3` installed
- ✅ `backend/src/r2Storage.ts` created
- ✅ `PUT /api/affiliate/profile/:lineUserId` endpoint added
- ✅ File size limit: **2MB** (optimized)
- ✅ CORS updated (supports PUT method)

### Frontend Implementation
- ✅ Bank selector grid UI implemented
- ✅ Image upload with preview
- ✅ File size validation: **2MB**
- ✅ Form validation logic
- ✅ Success/error notifications

---

## 📋 Manual Test Checklist

### 1. Access Portal
- [ ] Navigate to: http://localhost:5173/portal
- [ ] Login with LINE account
- [ ] Verify dashboard loads

### 2. Navigate to Profile Tab
- [ ] Click "บัญชี" (Profile) in bottom navigation
- [ ] Verify bank form appears
- [ ] Check UI matches design

### 3. Bank Selector Grid
- [ ] 6 banks displayed in 3x2 grid
- [ ] Banks: SCB, KBANK, BBL, KTB, TTB, BAY
- [ ] Click each bank
- [ ] Verify selection (blue border + bg)
- [ ] Verify only one can be selected

### 4. Account Number Input
- [ ] Enter account number
- [ ] Try entering letters (should filter to numbers only)
- [ ] Enter 9 digits (should show error on submit)
- [ ] Enter 10-12 digits (should accept)

### 5. Account Name Input
- [ ] Enter account holder name
- [ ] Verify Thai text works
- [ ] Leave empty (should show error on submit)

### 6. Image Upload - Empty State
- [ ] Verify dashed border upload box
- [ ] Verify upload icon displayed
- [ ] Verify text: "อัปโหลดรูปหน้าสมุดบัญชี"
- [ ] Verify text: "รองรับ JPG, PNG (ไม่เกิน 2MB)"

### 7. Image Upload - File Selection
- [ ] Click upload box
- [ ] File picker opens
- [ ] Select a valid image (< 2MB)
- [ ] Verify preview appears
- [ ] Verify edit button (blue) appears
- [ ] Verify delete button (red) appears

### 8. Image Upload - Validation
- [ ] Try uploading non-image file (PDF, TXT)
  - Expected: Error "กรุณาเลือกไฟล์รูปภาพเท่านั้น"
- [ ] Try uploading image > 2MB
  - Expected: Error "ขนาดไฟล์ต้องไม่เกิน 2MB"
- [ ] Try uploading valid image (< 2MB)
  - Expected: Preview displayed

### 9. Image Actions
- [ ] Click "delete" button
  - Expected: Image removed, back to empty state
- [ ] Upload image again
- [ ] Click "edit" button
  - Expected: File picker opens
- [ ] Select different image
  - Expected: Preview updates

### 10. Form Validation - Missing Fields
- [ ] Leave bank unselected, fill others, click save
  - Expected: Error "กรุณากรอกข้อมูลให้ครบถ้วน"
- [ ] Select bank, leave account number empty, click save
  - Expected: Error "กรุณากรอกข้อมูลให้ครบถ้วน"
- [ ] Select bank, fill account number, leave name empty, click save
  - Expected: Error "กรุณากรอกข้อมูลให้ครบถ้วน"

### 11. Form Validation - Invalid Account Number
- [ ] Enter 9 digits, click save
  - Expected: Error "เลขที่บัญชีต้องเป็นตัวเลข 10-12 หลัก"
- [ ] Enter 13 digits, click save
  - Expected: Error "เลขที่บัญชีต้องเป็นตัวเลข 10-12 หลัก"

### 12. Form Submission - Without R2 Configured
- [ ] Fill all required fields (without R2 credentials in .env)
- [ ] Upload image (optional)
- [ ] Click "บันทึกข้อมูลบัญชีธนาคาร"
- [ ] Expected:
  - Loading spinner appears
  - Bank info saved successfully
  - Image upload skipped (with console warning)
  - Success message: "บันทึกข้อมูลสำเร็จ!"

### 13. Form Submission - With R2 Configured
- [ ] Configure R2 in backend/.env
- [ ] Restart backend server
- [ ] Fill all required fields
- [ ] Upload image
- [ ] Click "บันทึกข้อมูลบัญชีธนาคาร"
- [ ] Expected:
  - Loading spinner appears
  - Bank info saved
  - Image uploaded to R2
  - Success message appears
  - Message auto-hides after 3 seconds

### 14. Data Persistence
- [ ] Refresh the page (F5)
- [ ] Navigate to Profile tab again
- [ ] Verify:
  - Selected bank is highlighted
  - Account number is pre-filled
  - Account name is pre-filled
  - Image preview shows (if uploaded)

### 15. Update Existing Data
- [ ] Change bank selection
- [ ] Update account number
- [ ] Update account name
- [ ] Upload new image
- [ ] Click save
- [ ] Verify all fields update correctly

### 16. UX Features
- [ ] Verify haptic feedback on:
  - Bank selection
  - Form submit (success)
  - Form submit (error)
- [ ] Verify loading state:
  - Button disabled while saving
  - Spinner appears
  - Text changes to "กำลังบันทึก..."
- [ ] Verify success message:
  - Green background with check icon
  - Auto-hides after 3 seconds
- [ ] Verify error messages:
  - Red background with error icon
  - Stays visible until dismissed

### 17. Mobile Responsiveness
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (iPhone 12)
- [ ] Verify:
  - Bank grid displays correctly (3 columns)
  - Image upload box fits screen
  - Form inputs are touch-friendly
  - Bottom navigation doesn't overlap content

### 18. Backend API Testing
```bash
# Test with curl (replace LINE_USER_ID with actual ID)
curl -X PUT http://localhost:3000/api/affiliate/profile/U1234567890abcdef1234567890abcdef \
  -F "bankName=SCB" \
  -F "accountNumber=1234567890" \
  -F "accountName=นาย ทดสอบ ระบบ" \
  -F "passbookImage=@/path/to/image.jpg"
```

Expected Response:
```json
{
  "success": true,
  "message": "บันทึกข้อมูลสำเร็จ",
  "data": {
    "bankName": "SCB",
    "bankAccountNumber": "1234567890",
    "bankAccountName": "นาย ทดสอบ ระบบ",
    "bankPassbookUrl": "https://pub-xxxxx.r2.dev/passbooks/uuid.jpg"
  }
}
```

---

## 🐛 Known Issues

*None yet - add any issues found during testing*

---

## 📝 Test Notes

### Console Logs to Monitor

**Backend:**
- ⚠️ "R2 storage configuration is incomplete" (if R2 not configured)
- ✅ "Passbook uploaded: [URL]" (on successful upload)
- ✅ "Profile updated for LINE User ID: [ID]"

**Frontend:**
- No errors in browser console
- No TypeScript compilation errors
- No runtime warnings

### Performance

- [ ] Image upload time < 3 seconds (for 2MB file)
- [ ] Form submission time < 2 seconds
- [ ] Page load time < 1 second

---

## ✅ Test Summary

**Total Tests:** 18 categories
**Passed:** 0
**Failed:** 0
**Pending:** 18

---

## 🚀 Next Steps After Testing

1. [ ] Fix any bugs found
2. [ ] Update documentation if needed
3. [ ] Commit changes
4. [ ] Push to GitHub
5. [ ] Deploy to production

---

## 📸 Screenshots

*Add screenshots here during testing*

---

**Test Instructions for User:**

1. Open http://localhost:5173/portal in browser
2. Login with LINE
3. Go to Profile tab (บัญชี)
4. Follow the checklist above
5. Report any issues found

---

**Backend URL:** http://localhost:3000
**Frontend URL:** http://localhost:5173
**API Health:** http://localhost:3000/health
