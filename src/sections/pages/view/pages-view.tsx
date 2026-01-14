"use client";

import {
  Add01Icon,
  Delete02Icon,
  Edit03Icon,
  Link05Icon,
  LinkSquare02Icon,
  MoreVerticalIcon,
  Share08Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "src/components/ui/alert-dialog";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { paths } from "src/routes/paths";
import { showToast } from "src/utils/toast";

// ------------------------------------------------------------

const pages = [
  {
    name: "Halaman Booking",
    domain: "halamanbooking",
  },
  {
    name: "Halaman Booking 2",
    domain: "halamanbooking2",
  },
  {
    name: "Halaman Booking 3",
    domain: "halamanbooking3",
  },
];

// ------------------------------------------------------------

export function PagesView() {
  const [newPageDialog, setNewPageDialog] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<{
    name: string;
    domain: string;
  } | null>(null);

  const handleCopy = (domain: string) => {
    navigator.clipboard.writeText(`https://${domain}.bookly.com`);
    // toast.success("Link berhasil disalin!");
    showToast("Link berhasil disalin!", "regular");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Halaman Booking</h1>
        <Button
          size="lg"
          variant="secondary"
          className="bg-indigo-500 hover:bg-indigo-500/90 dark:bg-indigo-400 dark:hover:bg-indigo-400/90 text-white rounded-full has-[>svg]:pr-4"
          onClick={() => setNewPageDialog(true)}
        >
          <HugeiconsIcon
            icon={Add01Icon}
            strokeWidth={2}
            className="size-4.5"
          />
          Buat Halaman Booking
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="col-span-2">
          <div className="flex flex-col gap-y-4">
            {pages.map((page, index) => (
              <Card key={index} className="border-0 rounded-2xl shadow-none">
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{page.name}</p>
                    <Link
                      href={`https://${page.domain}.bookly.com`}
                      className="text-sm text-indigo-500 hover:text-indigo-500/80 dark:text-indigo-400 dark:hover:text-indigo-400/80 font-medium"
                    >
                      {page.domain}.bookly.com
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                      onClick={() => handleCopy(page.domain)}
                    >
                      <HugeiconsIcon
                        icon={Link05Icon}
                        strokeWidth={2}
                        className="size-4.5"
                      />
                    </Button>
                    <Link
                      href={`https://${page.domain}.bookly.com`}
                      target="_blank"
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full"
                      >
                        <HugeiconsIcon
                          icon={LinkSquare02Icon}
                          strokeWidth={2}
                          className="size-4.5"
                        />
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full"
                        >
                          <HugeiconsIcon
                            icon={MoreVerticalIcon}
                            strokeWidth={2}
                            className="size-4.5"
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-40 rounded-xl"
                      >
                        <DropdownMenuItem>
                          <HugeiconsIcon icon={Edit03Icon} strokeWidth={2} />
                          Ubah
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <HugeiconsIcon icon={Share08Icon} strokeWidth={2} />
                          Bagikan
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-500 dark:text-red-400 focus:text-red-500 dark:focus:text-red-400 [&_svg:not([class*='text-'])]:text-red-500 dark:[&_svg:not([class*='text-'])]:text-red-400 focus:bg-red-500/10 dark:focus:bg-red-400/10"
                          onClick={() => setPageToDelete(page)}
                        >
                          <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>Ini</div>
      </div>
      <Dialog open={newPageDialog} onOpenChange={setNewPageDialog}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={!!pageToDelete}
        onOpenChange={(open) => !open && setPageToDelete(null)}
      >
        <AlertDialogContent className="w-100 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Hapus {pageToDelete?.name || "Halaman"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Halaman <strong>{pageToDelete?.name}</strong> akan dihapus dan
              tidak dapat dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-500/90 dark:bg-red-400 dark:hover:bg-red-400/90 text-white rounded-full"
              onClick={() => {
                // TODO: Implement delete logic
                setPageToDelete(null);
                showToast("Halaman berhasil dihapus", "regular");
              }}
            >
              Ya, hapus halaman ini
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
