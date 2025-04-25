import { Label } from "@/components/ui/label";
import { login, signup } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="border rounded-xl p-8 flex flex-col gap-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email:</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password:</Label>
          <Input id="password" name="password" type="password" required />
        </div>

        <Button formAction={login}>Log in</Button>
        <Button formAction={signup}>Sign up</Button>
      </form>
    </div>
  );
}
