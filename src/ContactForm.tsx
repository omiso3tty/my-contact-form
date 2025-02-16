import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Zod スキーマ定義
const contactSchema = z.object({
  name: z.string().min(2, { message: "名前は2文字以上必要です" }),
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください" }),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, {
      message: "電話番号は10〜11桁の数字で入力してください",
    }),
  age: z
    .number({ invalid_type_error: "年齢は数字で入力してください" })
    .min(18, { message: "18歳以上でなければなりません" })
    .max(120, { message: "年齢が不正です" }),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "性別を選択してください" }),
  }),
  inquiryType: z
    .string()
    .nonempty({ message: "問い合わせ種別を選択してください" }),
  message: z
    .string()
    .min(10, { message: "内容は10文字以上で入力してください" }),
  agree: z
    .boolean()
    .refine((val) => val, { message: "利用規約に同意してください" }),
});

// 型定義
type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur", // 入力欄からフォーカスが外れたタイミングでバリデーション
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form data:", data);
    alert("フォームが送信されました！");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-4">
      {/* 名前 */}
      <div className="mb-4">
        <label className="block mb-1">名前</label>
        <input
          type="text"
          {...register("name")}
          className="w-full p-2 border rounded"
          placeholder="例) 山田 太郎"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* メールアドレス */}
      <div className="mb-4">
        <label className="block mb-1">メールアドレス</label>
        <input
          type="email"
          {...register("email")}
          className="w-full p-2 border rounded"
          placeholder="例) example@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* 電話番号 */}
      <div className="mb-4">
        <label className="block mb-1">電話番号</label>
        <input
          type="text"
          {...register("phone")}
          className="w-full p-2 border rounded"
          placeholder="例) 09012345678"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* 年齢 */}
      <div className="mb-4">
        <label className="block mb-1">年齢</label>
        <input
          type="number"
          {...register("age", { valueAsNumber: true })}
          className="w-full p-2 border rounded"
          placeholder="例) 25"
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
        )}
      </div>

      {/* 性別 */}
      <div className="mb-4">
        <label className="block mb-1">性別</label>
        <div className="flex items-center">
          <label className="mr-4">
            <input
              type="radio"
              value="male"
              {...register("gender")}
              className="mr-1"
            />
            男性
          </label>
          <label className="mr-4">
            <input
              type="radio"
              value="female"
              {...register("gender")}
              className="mr-1"
            />
            女性
          </label>
          <label>
            <input
              type="radio"
              value="other"
              {...register("gender")}
              className="mr-1"
            />
            その他
          </label>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>

      {/* 問い合わせ種別 */}
      <div className="mb-4">
        <label className="block mb-1">問い合わせ種別</label>
        <select
          {...register("inquiryType")}
          className="w-full p-2 border rounded"
        >
          <option value="">選択してください</option>
          <option value="general">一般問い合わせ</option>
          <option value="support">サポート</option>
          <option value="feedback">フィードバック</option>
        </select>
        {errors.inquiryType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.inquiryType.message}
          </p>
        )}
      </div>

      {/* 内容 */}
      <div className="mb-4">
        <label className="block mb-1">内容</label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full p-2 border rounded"
          placeholder="お問い合わせ内容をご記入ください。"
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* 利用規約 */}
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" {...register("agree")} className="mr-2" />
          利用規約に同意する
        </label>
        {errors.agree && (
          <p className="text-red-500 text-sm mt-1">{errors.agree.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        送信
      </button>
    </form>
  );
};

export default ContactForm;
