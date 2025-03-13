
import React, { useState } from "react";
import { 
  Pencil, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronDown,
  FolderPlus,
  ImagePlus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/layout/AdminLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  image: string;
  hasSubcategories: boolean;
  expanded?: boolean;
  subcategories?: Category[];
}

const AdminCategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [activeTab, setActiveTab] = useState("information");
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [categoryContent, setCategoryContent] = useState("");
  const [selectedBannerTab, setSelectedBannerTab] = useState("desktop");
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null);

  // Mock categories data
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Electronics",
      image: "/placeholder.svg",
      hasSubcategories: true,
      expanded: false,
      subcategories: [
        {
          id: "1-1",
          name: "Smartphones",
          image: "/placeholder.svg",
          hasSubcategories: false
        },
        {
          id: "1-2",
          name: "Laptops",
          image: "/placeholder.svg",
          hasSubcategories: false
        }
      ]
    },
    {
      id: "2",
      name: "Clothing",
      image: "/placeholder.svg",
      hasSubcategories: true,
      expanded: false,
      subcategories: [
        {
          id: "2-1",
          name: "Men's Wear",
          image: "/placeholder.svg",
          hasSubcategories: false
        },
        {
          id: "2-2",
          name: "Women's Wear",
          image: "/placeholder.svg",
          hasSubcategories: false
        }
      ]
    },
    {
      id: "3",
      name: "Home & Kitchen",
      image: "/placeholder.svg",
      hasSubcategories: false
    }
  ]);

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryId: string) => {
    setCategories(prevCategories => 
      prevCategories.map(category => {
        if (category.id === categoryId) {
          return { ...category, expanded: !category.expanded };
        }
        return category;
      })
    );
  };

  // Filter categories based on search query
  const filteredCategories = searchQuery 
    ? categories.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.subcategories?.some(sub => 
          sub.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : categories;

  // Handle adding a new category
  const handleAddCategory = () => {
    setIsAddDialogOpen(true);
    setEditingCategory(null);
    setParentCategoryId(null);
    resetForm();
  };

  // Handle adding a new subcategory
  const handleAddSubcategory = (parentId: string) => {
    setIsAddDialogOpen(true);
    setEditingCategory(null);
    setParentCategoryId(parentId);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setCategoryName("");
    setBrandName("");
    setBrands([]);
    setCategoryContent("");
    setActiveTab("information");
    setSelectedBannerTab("desktop");
  };

  // Handle submit for adding/editing a category
  const handleSubmit = () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (editingCategory) {
      // Handle edit logic
      setCategories(prevCategories => {
        return prevCategories.map(category => {
          if (parentCategoryId) {
            // Editing a subcategory
            if (category.id === parentCategoryId && category.subcategories) {
              return {
                ...category,
                subcategories: category.subcategories.map(sub => 
                  sub.id === editingCategory.id 
                    ? { ...sub, name: categoryName }
                    : sub
                )
              };
            }
          } else if (category.id === editingCategory.id) {
            // Editing a main category
            return { 
              ...category,
              name: categoryName
            };
          }
          return category;
        });
      });
      toast.success("Category updated successfully");
    } else {
      // Handle add logic
      const newCategory = {
        id: Date.now().toString(),
        name: categoryName,
        image: "/placeholder.svg",
        hasSubcategories: false
      };

      if (parentCategoryId) {
        // Adding a subcategory
        setCategories(prevCategories => {
          return prevCategories.map(category => {
            if (category.id === parentCategoryId) {
              return {
                ...category,
                hasSubcategories: true,
                subcategories: [
                  ...(category.subcategories || []),
                  newCategory
                ]
              };
            }
            return category;
          });
        });
      } else {
        // Adding a main category
        setCategories(prevCategories => [...prevCategories, newCategory]);
      }
      toast.success("Category added successfully");
    }

    setIsAddDialogOpen(false);
    resetForm();
  };

  // Handle edit category
  const handleEditCategory = (category: Category, parentId?: string) => {
    setEditingCategory(category);
    setParentCategoryId(parentId || null);
    setCategoryName(category.name);
    setIsAddDialogOpen(true);
  };

  // Handle delete category
  const handleDeleteCategory = (categoryId: string, parentId?: string) => {
    if (parentId) {
      // Delete subcategory
      setCategories(prevCategories => {
        return prevCategories.map(category => {
          if (category.id === parentId && category.subcategories) {
            const updatedSubcategories = category.subcategories.filter(
              sub => sub.id !== categoryId
            );
            return {
              ...category,
              hasSubcategories: updatedSubcategories.length > 0,
              subcategories: updatedSubcategories
            };
          }
          return category;
        });
      });
    } else {
      // Delete main category
      setCategories(prevCategories => 
        prevCategories.filter(category => category.id !== categoryId)
      );
    }
    toast.success("Category deleted successfully");
  };

  // Handle adding a brand
  const handleAddBrand = () => {
    if (brandName.trim()) {
      setBrands([...brands, brandName]);
      setBrandName("");
    }
  };

  // Handle removing a brand
  const handleRemoveBrand = (index: number) => {
    setBrands(brands.filter((_, i) => i !== index));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Categories Management</h1>
          <Button onClick={handleAddCategory} className="gap-2">
            <Plus size={16} />
            Add New Category
          </Button>
        </div>

        <div className="w-full max-w-sm mb-6">
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="bg-card rounded-md shadow dark:shadow-purple-900/10">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[350px]">Category</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No categories found
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {filteredCategories.map((category) => (
                    <React.Fragment key={category.id}>
                      <TableRow className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {category.hasSubcategories && (
                              <button 
                                onClick={() => toggleCategoryExpansion(category.id)}
                                className="p-1 hover:bg-muted rounded-full"
                              >
                                {category.expanded ? (
                                  <ChevronDown size={16} className="text-foreground" />
                                ) : (
                                  <ChevronRight size={16} className="text-foreground" />
                                )}
                              </button>
                            )}
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center">
                                <img 
                                  src={category.image} 
                                  alt={category.name} 
                                  className="h-7 w-7 object-contain"
                                />
                              </div>
                              <span className="font-medium text-foreground">{category.name}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground">12</TableCell>
                        <TableCell>
                          <span className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          )}>
                            Active
                          </span>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleAddSubcategory(category.id)}
                            className="text-foreground"
                          >
                            <FolderPlus size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditCategory(category)}
                            className="text-foreground"
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-foreground"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>

                      {/* Subcategories */}
                      {category.expanded && category.subcategories && category.subcategories.map((subcategory) => (
                        <TableRow key={subcategory.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center gap-3 pl-10">
                              <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                                <img 
                                  src={subcategory.image} 
                                  alt={subcategory.name} 
                                  className="h-6 w-6 object-contain"
                                />
                              </div>
                              <span className="font-medium text-foreground">{subcategory.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-foreground">5</TableCell>
                          <TableCell>
                            <span className={cn(
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                              "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            )}>
                              Active
                            </span>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditCategory(subcategory, category.id)}
                              className="text-foreground"
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteCategory(subcategory.id, category.id)}
                              className="text-foreground"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {editingCategory 
                ? `Edit ${parentCategoryId ? 'Subcategory' : 'Category'}`
                : `Add New ${parentCategoryId ? 'Subcategory' : 'Category'}`}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left sidebar navigation */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3 text-foreground">Quick Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    className={`w-full text-left py-2 px-3 rounded-md text-sm ${activeTab === 'information' ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                    onClick={() => setActiveTab('information')}
                  >
                    Information
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left py-2 px-3 rounded-md text-sm ${activeTab === 'banner' ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                    onClick={() => setActiveTab('banner')}
                  >
                    Banner
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left py-2 px-3 rounded-md text-sm ${activeTab === 'content' ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                    onClick={() => setActiveTab('content')}
                  >
                    Content
                  </button>
                </li>
              </ul>
            </div>

            {/* Right content area */}
            <div className="col-span-1 md:col-span-3">
              <div className="space-y-8">
                {/* Information Tab */}
                {activeTab === 'information' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-foreground">Information</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Category Image</label>
                        <div className="border border-dashed border-input rounded-md p-4 w-24 h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50">
                          <ImagePlus className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Recommended Size ( 1000px x 1248px ) | File Type ( pdf, png, jpeg ) | Number of Files : 4
                        </p>
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">
                          Category Name <span className="text-destructive">*</span>
                        </label>
                        <Input 
                          placeholder="Enter category name"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">
                          Brand Name <span className="text-destructive">*</span>
                        </label>
                        <div className="flex gap-2">
                          <Input 
                            placeholder="Enter brand name"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            variant="outline" 
                            onClick={handleAddBrand} 
                            className="gap-1"
                          >
                            <Plus size={16} /> Add
                          </Button>
                        </div>
                        
                        {brands.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {brands.map((brand, index) => (
                              <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                                <span className="text-foreground">{brand}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveBrand(index)}
                                  className="h-6 w-6 p-0 text-destructive"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Banner Tab */}
                {activeTab === 'banner' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-foreground">Banner</h2>
                    <p className="text-sm text-muted-foreground">Add a category banner</p>
                    
                    <div className="space-y-4">
                      <Tabs value={selectedBannerTab} onValueChange={setSelectedBannerTab}>
                        <TabsList>
                          <TabsTrigger value="desktop">For Desktop</TabsTrigger>
                          <TabsTrigger value="mobile">For Mobile</TabsTrigger>
                        </TabsList>
                        <TabsContent value="desktop" className="pt-4">
                          <div className="border border-dashed border-input rounded-md h-60 flex flex-col items-center justify-center">
                            <ImagePlus className="h-16 w-16 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Add a category banner</p>
                            <p className="text-xs text-muted-foreground mt-1">Recommended Size ( 1000px x 1248px )</p>
                          </div>
                        </TabsContent>
                        <TabsContent value="mobile" className="pt-4">
                          <div className="border border-dashed border-input rounded-md h-60 flex flex-col items-center justify-center">
                            <ImagePlus className="h-16 w-16 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">Add a category banner</p>
                            <p className="text-xs text-muted-foreground mt-1">Recommended Size ( 1000px x 1248px )</p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-foreground">Content</h2>
                    <p className="text-sm text-muted-foreground">Category content</p>
                    
                    <div>
                      <Textarea 
                        placeholder="Enter the Category content"
                        value={categoryContent}
                        onChange={(e) => setCategoryContent(e.target.value)}
                        className="min-h-[200px]"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 text-right">
                <Button 
                  variant="default" 
                  onClick={handleSubmit}
                  className="bg-primary-500 hover:bg-primary-600"
                >
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCategories;
