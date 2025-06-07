import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router";

export default function RouterResponsive() {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="outline">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px] p-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Label>Lịch chiếu</Label>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <Button variant="link" asChild className="text-left">
                <SheetClose asChild>
                  <Link to="/cinema/lich-chieu" className="text-left">
                    Lịch chiếu phim hôm nay
                  </Link>
                </SheetClose>
              </Button>
              <Button variant="link" asChild>
                <SheetClose asChild>
                  <Link to="/cinema/phim-dang-chieu">Phim đang chiếu</Link>
                </SheetClose>
              </Button>
              <Button variant="link" asChild>
                <SheetClose asChild>
                  <Link to="/cinema/phim-sap-chieu">Phim sắp chiếu</Link>
                </SheetClose>
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <Label>Rạp chiếu</Label>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <Button variant="link" asChild className="text-left">
                <SheetClose asChild>
                  <Link to="/cinema/rap/cgv">CGV</Link>
                </SheetClose>
              </Button>
              <Button variant="link" asChild>
                <SheetClose asChild>
                  <Link to="/cinema/rap/galaxy">Galaxy Cinema</Link>
                </SheetClose>
              </Button>
              <Button variant="link" asChild>
                <SheetClose asChild>
                  <Link to="/cinema/rap/lotte">Lotte Cinema</Link>
                </SheetClose>
              </Button>
              <Button variant="link" asChild>
                <SheetClose asChild>
                  <Link to="/cinema/rap/beta">Beta Cinema</Link>
                </SheetClose>
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <Label>Tìm kiếm</Label>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <Input placeholder="Tìm kiếm phim, rạp..." />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <SheetClose asChild>
                <Link to="/cinema/review">Review phim</Link>
              </SheetClose>
            </AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              <SheetClose asChild>
                <Link to="/cinema/top-phim">Top phim</Link>
              </SheetClose>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
